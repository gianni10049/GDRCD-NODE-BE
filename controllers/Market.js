let {
	MarketBuy,
	Objects,
	ObjectsTypes,
	ObjectsQualities,
	ObjectsList,
	CharacterPoints
} = require('./../models');
const { Op } = require('sequelize');
const { CharactersController } = require('./Characters');
const { i18n } = require('../i18n');

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
				},
			},
		});
	}

	/**
	 * @note Object data from market_buy table
	 * @returns {Promise<*>}
	 * @param id
	 */
	static async getMarketBuyQuery(id) {
		return await MarketBuy.findOne({
			where: { id: id },
			deletedAt: {
				[Op.is]: null,
			},
			include: [
				{
					model: Objects,
					as: 'objectData',
				},
			],
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
			where: {
				deletedAt: {
					[Op.is]: null,
				},
			},
			include: [
				{
					model: Objects,
					as: 'objectData',
					required: true,
					include: [
						{
							model: ObjectsTypes,
							as: 'typeData',
							required: true,
						},
						{
							model: ObjectsQualities,
							as: 'qualityData',
							required: true,
						},
					],
				},
			],
		});
	}

	/**
	 * @note Buy object from market
	 * @param data
	 * @returns {Promise<{response: boolean, responseStatus: string}>}
	 */
	static async marketBuyItem(data) {
		let { tokenData, id } = data;

		if (await this.marketBuyExist(id)) {
			if (tokenData?.character) {
				let character_id = tokenData?.character?.id;

				let character_points = await CharactersController.getCharacterPointsQuery(character_id);

				// If character Points exist
				if (character_points) {
					let resources = character_points?.resources;

					let market_buy_data = await this.getMarketBuyQuery(id);

					// If object is possible to exist in market
					if (market_buy_data?.objectData?.marketable) {

						// If remained object to sell
						if(market_buy_data?.remained > 0) {

							// If character have enough resources
							if (market_buy_data?.objectData?.price <= resources) {

								// Create object
								await ObjectsList.create({
									owner_type: 1,
									owner: character_id,
									object: market_buy_data?.objectData?.id,
									quality: market_buy_data?.objectData?.quality,
									status: 1,
									charges: market_buy_data?.objectData?.charges
								});

								// Update market buy charges
								if(market_buy_data?.remained === 1) {
									await MarketBuy.update({
										remained: market_buy_data?.remained - 1,
										deletedAt: new Date(),
									},{
										where:{
											id: id,
										}
									})
								} else {
									await MarketBuy.update({
										remained: market_buy_data?.remained - 1,
									},{
										where:{
											id: id,
										}
									})
								}

								// Calc new resources
								let new_resources = resources - market_buy_data?.objectData?.price;

								// Update character points
								await CharacterPoints.update({
									resources: new_resources,
								}, {
									where: {
										character: character_id,
									}
								});

								return {
									response: true,
									responseStatus: i18n.t('marketBuyItem.success'),
									list: await this.getMarketBuyList(),
								}

							} else{
								return {
									response: false,
									responseStatus: i18n.t('marketBuyItem.noResources')
								}
							}
						}
						 else{
							 await MarketBuy.update({
								 deletedAt: new Date(),
							 },{
								 where:{
									 id: id,
								 }
							 })

							return {
								response: false,
								responseStatus: i18n.t('marketBuyItem.noRemained')
							}
						}
					} else{
						return {
							response: false,
							responseStatus: i18n.t('marketBuyItem.noMarketable')
						}
					}

				} else{
					return {
						response: false,
						responseStatus: i18n.t('marketBuyItem.noCharacterPoints')
					}
				}
			} else{
				return {
					response: false,
					responseStatus: i18n.t('general.characterExistence')
				}
			}
		} else{
			return {
				response: false,
				responseStatus: i18n.t('marketBuyItem.noExistence')
			}
		}
	}

}

exports.MarketController = MarketController;
