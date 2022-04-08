'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class Permission extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.Permission.hasMany(models.PermissionGroupPivot, {
				foreignKey: 'permission',
				name: 'id',
				allowNull: false,
				as: 'permissionGroups',
			});
		}
	}

	Permission.init(
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
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'permission',
			modelName: 'Permission',
		}
	);
	return Permission;
};
