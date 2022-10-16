'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class MarketSell extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.MarketSell.hasOne(models.ObjectsList, {
				foreignKey: 'id',
				name: 'object',
				as: 'objectListData',
			});
		}
	}

	MarketSell.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			object: {
				type: Sequelize.INTEGER,
			},
			price: {
				type: Sequelize.INTEGER,
			},
			selled_to: {
				type: Sequelize.INTEGER,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'market_sell',
			modelName: 'MarketSell',
		},
	);
	return MarketSell;
};
