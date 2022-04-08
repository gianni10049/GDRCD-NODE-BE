'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class AccountPermission extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.AccountPermission.hasOne(models.Account, {
				foreignKey: 'id',
				name: 'account',
				allowNull: false,
				as: 'accountData',
			});
			models.AccountPermission.hasOne(models.Permission, {
				foreignKey: 'id',
				name: 'permission',
				allowNull: false,
				as: 'permissionData',
			});
		}
	}

	AccountPermission.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			permission: {
				type: Sequelize.INTEGER,
			},
			account: {
				type: Sequelize.INTEGER,
			},
			assigned_by: {
				type: Sequelize.INTEGER,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'account_permission',
			modelName: 'AccountPermission',
		}
	);
	return AccountPermission;
};
