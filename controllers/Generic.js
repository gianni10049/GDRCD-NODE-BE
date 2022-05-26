let { CharacterPoints } = require('./../models');
let { Token } = require('./Token');
const { Op } = require('sequelize');
const { i18n } = require('../i18n');
const { CharactersController } = require('./Characters');
const { Sequelize } = require('sequelize');

class GenericController {
	static async sendMoney(data) {
		let { token, character, money } = data;

		let control = await Token.routeControl({
			token: token,
			account_needed: true,
			character_needed: true,
		});

		let response = false,
			responseStatus,
			damages = [];

		if (control.response) {
			if (await CharactersController.characterExist(character)) {
				let points = await CharacterPoints.findOne({
					where: {
						character: control.character.id,
						deletedAt: {
							[Op.is]: null,
						},
					},
				});

				let resources = points.resources;

				if (resources >= money) {
					await CharacterPoints.update(
						{
							resources: Sequelize.literal(
								`resources-'${money}'`
							),
						},
						{ where: { character: control.character.id } }
					);
					await CharacterPoints.update(
						{
							resources: Sequelize.literal(
								`resources+'${money}'`
							),
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
		} else {
			responseStatus = i18n.t('permissionError');
		}

		return {
			responseStatus,
			response,
			damages: damages,
		};
	}
}

exports.GenericController = GenericController;
