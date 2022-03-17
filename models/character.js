'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class Character extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {}
	}

	Character.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			name: {
				type: Sequelize.STRING,
			},
			surname: {
				type: Sequelize.STRING,
			},
			age: {
				type: Sequelize.INTEGER,
			},
			active: {
				type: Sequelize.BOOLEAN,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'character',
			modelName: 'Character',
		}
	);
	return Character;
};
