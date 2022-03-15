'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class RolledDices extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {}
	}

	RolledDices.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			rolled: {
				type: Sequelize.STRING,
			},
			createdAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'rolled_dices',
			modelName: 'RolledDices',
		}
	);
	return RolledDices;
};
