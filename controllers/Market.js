let {
	MarketBuy,
	Objects,
	ObjectsStatus,
	ObjectsTypes,
	ObjectsQualities,
} = require('./../models');
const { Op } = require('sequelize');

class MarketController {

	/**
	 * @note Offer exist in market_buy table
	 * @param id
	 * @returns {Promise<*>}
	 */
	static async marketBuyExist(id) {
		return await MarketBuy.count({
			where: {
				id: id,
				deletedAt: {
					[Op.is]: null,
				}
			},
		});
	}

	/**
	 * @note Object data from market_buy table
	 * @param data = {id, tokenData}
	 * @returns {Promise<*>}
	 */
	static async getMarketBuyQuery(data) {
		let { id } = data;

		return await MarketBuy.findOne({
			where: { id: id },
			deletedAt: {
				[Op.is]: null,
			},
		});
	}

	static async getMarketBuyData(data) {
		let { id } = data;

		if (!await this.marketBuyExist(id)) {
			return false;
		}

		return await this.getMarketBuyQuery(id);
	}

	static async getMarketBuyList() {
		return await MarketBuy.findAll({
			where: true,
			deletedAt: {
				[Op.is]: null,
			},
			include:[
				{
					model: Objects,
					as: 'objectData',
					required: true,
					include: [
						{
							model: ObjectsStatus,
							as: 'statusData',
							required: true,
						},
						{
							model: ObjectsTypes,
							as: 'typeData',
							required: true,
						},
						{
							model: ObjectsQualities,
							as: 'qualityData',
							required: true,
						}
					]
				},
			],
		});
	}

}

exports.MarketController = MarketController;
