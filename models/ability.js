'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class Ability extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {}
	}

	Ability.init(
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
			stat: {
				type: Sequelize.INTEGER,
			},
			castable: {
				type: Sequelize.BOOLEAN,
			},
			visible: {
				type: Sequelize.BOOLEAN,
			},
			createdBy: {
				type: Sequelize.INTEGER,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'ability',
			modelName: 'Ability',
		}
	);
	return Ability;
};
