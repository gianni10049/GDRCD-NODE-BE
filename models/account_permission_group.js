'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class AccountPermissionGroup extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.AccountPermissionGroup.hasOne(models.PermissionGroup, {
				foreignKey: 'id',
				name: 'group',
				allowNull: false,
				as: 'permissionGroupsData',
			});
		}
	}

	AccountPermissionGroup.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			group: {
				type: Sequelize.INTEGER,
			},
			account: {
				type: Sequelize.INTEGER,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'account_permission_group',
			modelName: 'AccountPermissionGroup',
		}
	);
	return AccountPermissionGroup;
};
