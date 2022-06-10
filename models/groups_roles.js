'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class GroupsRoles extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.GroupsRoles.hasMany(models.GroupsMembers, {
				foreignKey: 'role',
				name: 'id',
				allowNull: true,
				as: 'groupMembers',
			});
			models.GroupsRoles.belongsTo(models.Groups, {
				foreignKey: 'group',
				as: 'groupData',
			});
		}
	}

	GroupsRoles.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			group: {
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.STRING,
			},
			earn: {
				type: Sequelize.INTEGER,
			},
			logo: {
				type: Sequelize.STRING,
			},
			visible: {
				type: Sequelize.INTEGER,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'groups_roles',
			modelName: 'GroupsRoles',
		}
	);
	return GroupsRoles;
};
