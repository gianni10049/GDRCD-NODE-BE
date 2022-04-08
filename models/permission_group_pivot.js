'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class PermissionGroupPivot extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {}
	}

	PermissionGroupPivot.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			group: {
				type: Sequelize.INTEGER,
			},
			permission: {
				type: Sequelize.INTEGER,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'permission_group_pivot',
			modelName: 'PermissionGroupPivot',
		}
	);
	return PermissionGroupPivot;
};
