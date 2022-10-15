'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class ObjectsStatus extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.ObjectsStatus.hasMany(models.ObjectsList, {
				foreignKey: 'status',
				name: 'id',
				as: 'listData',
			});
		}
	}

	ObjectsStatus.init(
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
				type: Sequelize.TEXT,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'objects_status',
			modelName: 'ObjectsStatus',
		}
	);
	return ObjectsStatus;
};
