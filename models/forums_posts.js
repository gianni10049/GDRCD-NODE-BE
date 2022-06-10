'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class ForumsPosts extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.ForumsPosts.belongsTo(models.Forums, {
				foreignKey: 'forum',
				as: 'forumData',
			});
			models.ForumsPosts.hasMany(models.ForumsComments, {
				foreignKey: 'post',
				name: 'id',
				allowNull: true,
				as: 'commentsData',
			});
			models.ForumsPosts.hasMany(models.ForumsReads, {
				foreignKey: 'post',
				name: 'id',
				allowNull: true,
				as: 'readsData',
			});
		}
	}

	ForumsPosts.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			character: {
				type: Sequelize.INTEGER,
			},
			forum: {
				type: Sequelize.INTEGER,
			},
			title: {
				type: Sequelize.STRING,
			},
			text: {
				type: Sequelize.STRING,
			},
			closed: {
				type: Sequelize.BOOLEAN,
			},
			important: {
				type: Sequelize.BOOLEAN,
			},
			visible: {
				type: Sequelize.BOOLEAN,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'forums_posts',
			modelName: 'ForumsPosts',
		}
	);
	return ForumsPosts;
};
