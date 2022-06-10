'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class Groups extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.Groups.hasMany(models.GroupsRoles, {
				foreignKey: 'group',
				name: 'id',
				allowNull: true,
				as: 'rolesData',
			});
			models.Groups.belongsTo(models.GroupsTypes, {
				foreignKey: 'type',
				as: 'groupTypeData',
			});
		}
	}

	Groups.init(
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
			logo: {
				type: Sequelize.STRING,
			},
			external_url: {
				type: Sequelize.STRING,
			},
			type: {
				type: Sequelize.INTEGER,
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
			tableName: 'groups',
			modelName: 'Groups',
		}
	);
	return Groups;
};
