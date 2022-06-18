let {
	Forums,
	ForumsPosts,
	ForumsMembers,
	Character,
	ForumsComments,
	ForumsReads,
} = require('./../models');
const { Op, Sequelize } = require('sequelize');
const { GroupsController } = require('./Groups');
const { PermissionController } = require('./Permission');
const limit_results_post = 5;
const limit_results_forum = 10;

class ForumsController {
	/*** FORUM ***/

	static async forumExist(id) {
		return Forums.count({
			where: {
				id: id,
				deletedAt: {
					[Op.is]: null,
				},
				visible: true,
			},
		});
	}

	static async isForumMember(character, forum) {
		let member_data = await ForumsMembers.findOne({
			where: {
				forum: forum,
				character: character,
			},
		});

		return !!member_data;
	}

	static async getForumsQuery() {
		return await Forums.findAll({
			where: {
				deletedAt: {
					[Op.is]: null,
				},
				visible: true,
			},
			include: [
				{
					model: ForumsPosts,
					as: 'postsData',
					required: false,
				},
			],
			order: [
				[
					Sequelize.literal(
						'CASE ' +
						'WHEN `type` like \'public\' THEN 1 ' +
						'WHEN `type` like \'group\' THEN 2 ' +
						'WHEN `type` like \'private\' THEN 3 ' +
						' ELSE 4 END',
					),
					'ASC',
				],
			],
		});
	}

	static async getForum(data) {
		let { id } = data;

		if (await this.forumExist(id)) {
			return await Forums.findOne({
				where: { id: id },
				deletedAt: {
					[Op.is]: null,
				},
				visible: true,
				include: [
					{
						model: ForumsPosts,
						as: 'postsData',
						required: false,
					},
				],
				order: [['type', 'ASC']],
			});
		}
	}

	static async getForums(data) {
		let { tokenData } = data;

		let forums = await this.getForumsQuery();
		let allowed_forums = [];

		for (let forum of forums) {
			if (await this.forumsPermission(forum, tokenData.character.id)) {
				allowed_forums.push(forum);
			}
		}

		let results = [];

		for (let forum of allowed_forums) {
			forum.total_results = forum.postsData.length;

			forum.total_pages = Math.ceil(forum.total_results / limit_results_forum);

			forum.to_read = false;

			for (let post of forum.postsData) {
				let control_read = await ForumsPosts.findAll({
					include: [{
						model: ForumsReads,
						as: 'readsData',
						required:false,
						where:{
							character: tokenData.character.id
						}
					}],
					where:{
						'$readsData.id$':null,
						id: post.id
					}
				});

				if(Object.keys(control_read).length > 0){
					forum.to_read = true;
					break;
				}

			}


			results.push(forum);
		}

		return results;
	}

	static async forumsPermission(forum, me) {
		if (forum) {
			switch (forum.type) {
				case 'group':
					return await GroupsController.isGroupMember(
						forum.owner,
						me,
					);
				case 'private':
					if (forum.owner === me) {
						return true;
					} else {
						return await this.isForumMember(forum.id, me);
					}
				case 'public':
					return true;
				default:
					return false;
			}
		} else {
			return false;
		}
	}

	/*** POSTS ***/

	static async getForumPostsQuery(forum, page = 1) {
		return await ForumsPosts.findAll({
			where: {
				forum,
				deletedAt: {
					[Op.is]: null,
				},
				visible: true,
			},
			include: [
				{
					model: Character,
					as: 'characterData',
				},
				{
					model: ForumsComments,
					as: 'commentsData',
				},
			],
			order: [
				['important', 'DESC'],
				['createdAt', 'DESC'],
			],
			offset: ((page - 1) * limit_results_forum),
			limit: limit_results_forum,
		});
	}

	static async getPostQuery(post, page) {
		let data = await ForumsPosts.findOne({
			where: {
				id: post,
				deletedAt: {
					[Op.is]: null,
				},
				visible: true,
			},
			include: [
				{
					model: Character,
					as: 'characterData',
				},
				{
					model: ForumsComments,
					as: 'commentsData',
					order: [['createdAt', 'ASC']],
					include: [{
						model: Character,
						as: 'characterData',
					}],

					offset: ((page - 1) * limit_results_post),
					limit: limit_results_post,
				},
			],
		});

		let total = await ForumsComments.findAll({
			where: {
				post,
				deletedAt: {
					[Op.is]: null,
				},
			},
		});


		return {
			post: data,
			total_pages: Math.ceil(total.length / limit_results_post),
			total_results: total.length,
		};
	}

	static async getPosts(data) {
		let { forum, page, tokenData } = data;

		let posts =  await this.getForumPostsQuery(forum, page);
		let total = await ForumsPosts.findAll({
			where: {
				forum,
				deletedAt: {
					[Op.is]: null,
				},
				visible: true,
			},
		});

		let results = [];

		for (let post of posts) {
			post.to_read = false;

			let control_read = await ForumsPosts.findAll({
				include: [{
					model: ForumsReads,
					as: 'readsData',
					required:false,
					where:{
						character: tokenData.character.id
					}
				}],
				where:{
					'$readsData.id$':null,
					id: post.id
				}
			});

			if(Object?.keys(control_read)?.length > 0){
				post.to_read = true;
			}

			results.push(post);
		}

		return {
			posts: results,
			total_pages: Math.ceil(total.length / limit_results_forum),
			total_results: total.length,
		};
	}

	static async getPost(data) {
		let { post, page, tokenData } = data;

		await ForumsReads.findOne({
			where:{
				character: tokenData.character.id,
				post
			}
		}).then((obj) => {

			if(!obj){
				ForumsReads.create({
					character: tokenData.character.id,
					post
				})
			}
		})


		return await this.getPostQuery(post, page);
	}

	static async newPost(data) {
		let { tokenData, forum, title, text } = data;

		await ForumsPosts.create({
			forum,
			title,
			text,
			visible: 1,
			closed: 0,
			important: 0,
			character: tokenData?.character?.id,
		});

		return await this.getForumPostsQuery(forum, 1);
	}

	static async newComment(data) {
		let { tokenData, post, text } = data;

		await ForumsComments.create({
			post,
			text,
			character: tokenData?.character?.id,
		});

		await ForumsReads.destroy({
			where: {
				post: post
			}
		})

		return await this.getPostQuery(post, 1);
	}

	static async updatePostClose(data) {
		let { tokenData, post } = data;

		let permission = await PermissionController.permissionControl({
			tokenData: tokenData,
			permission: 'MANAGE_POSTS',
		});

		if (permission.response) {
			let post_data = await ForumsPosts.findOne({
				where: {
					id: post,
				},
			});

			await ForumsPosts.update({
				closed: !post_data.closed,
			}, { where: { id: post } });

			return await this.getPostQuery(post, 1);
		}
	}

	static async updatePostImportant(data) {
		let { tokenData, post } = data;

		let permission = await PermissionController.permissionControl({
			tokenData: tokenData,
			permission: 'MANAGE_POSTS',
		});

		if (permission.response) {
			let post_data = await ForumsPosts.findOne({
				where: {
					id: post,
				},
			});

			await ForumsPosts.update({
				important: !post_data.important,
			}, { where: { id: post } });

			return await this.getPostQuery(post, 1);
		}
	}
}

exports.ForumsController = ForumsController;
