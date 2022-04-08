'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class PermissionGroup extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.PermissionGroup.hasMany(models.PermissionGroupPivot, {
				foreignKey: 'group',
				name: 'id',
				allowNull: false,
				as: 'permissionGroupsData',
			});
		}
	}

	PermissionGroup.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			name: {
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.STRING,
			},
			admin: {
				type: Sequelize.BOOLEAN,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'permission_group',
			modelName: 'PermissionGroup',
		}
	);
	return PermissionGroup;
};
