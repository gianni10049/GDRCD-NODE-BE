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

	static async getGroups() {
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

	static async getGroup(data) {
		let { id } = data;

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
							include: [{ model: Character, as: 'memberData' }],
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

	static async isGroupMember(group, character) {
		let data = await Groups.findOne({
			where: { id: group },
			deletedAt: {
				[Op.is]: null,
			},
			visible: true,
			include: [
				{
					model: GroupsRoles,
					as: 'rolesData',
					include: [
						{
							model: GroupsMembers,
							as: 'groupMembers',
							include: [{ model: Character, as: 'memberData' }],
						},
					],
				},
			],
			order: [['type', 'ASC']],
		});

		let members = [];

		data?.rolesData?.forEach((role) => {
			role?.groupMembers?.forEach((member) => {
				members.push(member.character);
			});
		});

		return [...new Set(members)].includes(character);
	}

	static async isGroupManager(group, character) {
		let data = await Groups.findOne({
			where: { id: group },
			deletedAt: {
				[Op.is]: null,
			},
			visible: true,
			include: [
				{
					model: GroupsRoles,
					as: 'rolesData',
					include: [
						{
							model: GroupsMembers,
							as: 'groupMembers',
							include: [{ model: Character, as: 'memberData' }],
							where: {
								manager: true,
							},
						},
					],
				},
			],
			order: [['type', 'ASC']],
		});

		let managers = [];

		data?.rolesData?.forEach((role) => {
			role?.groupMembers?.forEach((member) => {
				managers.push(member.character);
			});
		});

		return [...new Set(managers)].includes(character);
	}
}

exports.GroupsController = GroupsController;
