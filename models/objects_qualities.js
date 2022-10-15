'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class ObjectsQualities extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {

		}
	}

	ObjectsQualities.init(
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
			tableName: 'objects_qualities',
			modelName: 'ObjectsQualities',
		}
	);
	return ObjectsQualities;
};
