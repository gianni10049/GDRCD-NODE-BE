'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class GroupsTypes extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.GroupsTypes.hasMany(models.Groups, {
				foreignKey: 'type',
				name: 'id',
				allowNull: true,
				as: 'groupData',
			});
		}
	}

	GroupsTypes.init(
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
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'groups_types',
			modelName: 'GroupsTypes',
		}
	);
	return GroupsTypes;
};
