const { Token } = require('./Token');
let {
	Groups,
	GroupsTypes,
	GroupsRoles,
	GroupsMembers,
	Character,
} = require('./../models');
const { Op } = require('sequelize');

class GroupsController {
	static async groupExist(id) {
		return Groups.count({
			where: {
				id: id,
				deletedAt: {
					[Op.is]: null,
				},
				visible: true,
			},
		});
	}

	static async getGroups(data) {
		let { token } = data;

		let control = await Token.routeControl({
			token: token,
			account_needed: true,
			character_needed: true,
		});

		if (control.response) {
			return await Groups.findAll({
				where: true,
				deletedAt: {
					[Op.is]: null,
				},
				visible: true,
				include: [
					{
						model: GroupsRoles,
						as: 'rolesData',
					},
					{
						model: GroupsTypes,
						as: 'groupTypeData',
					},
				],
				order: [['type', 'ASC']],
			});
		}
	}
	static async getGroup(data) {
		let { token, id } = data;

		let control = await Token.routeControl({
			token: token,
			account_needed: true,
			character_needed: true,
		});

		if (control.response) {
			return await Groups.findOne({
				where: { id: id },
				deletedAt: {
					[Op.is]: null,
				},
				visible: true,
				include: [
					{
						model: GroupsRoles,
						as: 'rolesData',
						required: false,
						include: [
							{
								model: GroupsMembers,
								as: 'groupMembers',
								required: false,
								include: [
									{ model: Character, as: 'memberData' },
								],
							},
						],
					},
					{
						model: GroupsTypes,
						as: 'groupTypeData',
						required: false,
					},
				],
				order: [['type', 'ASC']],
			});
		}
	}
}

exports.GroupsController = GroupsController;
