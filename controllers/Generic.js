let { CharacterPoints } = require('./../models');
const { Op } = require('sequelize');
const { i18n } = require('../i18n');
const { CharactersController } = require('./Characters');
const { Sequelize } = require('sequelize');

class GenericController {
	static async sendMoney(data) {
		let { tokenData, character, money } = data;

		let response = false,
			responseStatus,
			damages = [];

		if (await CharactersController.characterExist(character)) {
			let points = await CharacterPoints.findOne({
				where: {
					character: tokenData.character.id,
					deletedAt: {
						[Op.is]: null,
					},
				},
			});

			let resources = points.resources;

			if (resources >= money) {
				await CharacterPoints.update(
					{
						resources: Sequelize.literal(`resources-'${money}'`),
					},
					{ where: { character: tokenData.character.id } }
				);
				await CharacterPoints.update(
					{
						resources: Sequelize.literal(`resources+'${money}'`),
					},
					{ where: { character: character } }
				);

				responseStatus = i18n.t('sendMoney.done');
				response = true;
			} else {
				responseStatus = i18n.t('sendMoney.noMoney');
			}
		} else {
			responseStatus = i18n.t('getCharacterStats.existence');
		}

		return {
			responseStatus,
			response,
			damages: damages,
		};
	}
}

exports.GenericController = GenericController;
