'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class GroupsMembers extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.GroupsMembers.belongsTo(models.GroupsRoles, {
				foreignKey: 'role',
				as: 'rolesData',
			});
			models.GroupsMembers.belongsTo(models.Character, {
				foreignKey: 'character',
				as: 'memberData',
			});
		}
	}

	GroupsMembers.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			role: {
				type: Sequelize.INTEGER,
			},
			character: {
				type: Sequelize.INTEGER,
			},
			manager: {
				type: Sequelize.INTEGER,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'groups_members',
			modelName: 'GroupsMembers',
		}
	);
	return GroupsMembers;
};
