'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class MarketBuy extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.MarketBuy.hasOne(models.Objects, {
				foreignKey: 'id',
				name: 'object',
				as: 'objectData',
			});
		}
	}

	MarketBuy.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			object:{
				type: Sequelize.INTEGER,
			},
			total:{
				type: Sequelize.INTEGER,
			},
			remained:{
				type: Sequelize.INTEGER,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'market_buy',
			modelName: 'MarketBuy',
		}
	);
	return MarketBuy;
};
