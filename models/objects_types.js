'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class ObjectsTypes extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.ObjectsTypes.hasMany(models.Objects, {
				foreignKey: 'type',
				name: 'id',
				as: 'typeData',
			});
		}
	}

	ObjectsTypes.init(
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
			tableName: 'objects_types',
			modelName: 'ObjectsTypes',
		}
	);
	return ObjectsTypes;
};
