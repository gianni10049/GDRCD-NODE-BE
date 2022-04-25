let {
	Character,
	CharacterStats,
	Stats,
	CharacterAbility,
	Ability,
	AbilityDetails,
} = require('./../models');
let { Token } = require('./Token');
const { Op } = require('sequelize');
const { i18n } = require('../i18n');

class CharactersController {
	static async characterExist(id) {
		return Character.count({
			where: {
				id: id,
				deletedAt: {
					[Op.is]: null,
				},
			},
		});
	}

	static async getCharactersList(data) {
		let { token } = data;

		let tokenData = await Token.verifyToken(token);

		if (tokenData.account) {
			return await Character.findAll({
				where: {
					account: tokenData.account.id,
					deletedAt: {
						[Op.is]: null,
					},
				},
			});
		}
	}

	static async setCharacter(data) {
		let { token, characterId } = data;

		let tokenData = await Token.verifyToken(token);

		if (tokenData.account) {
			let account_id = tokenData.account.id;

			let character = await Character.findOne({
				where: {
					id: characterId,
					deletedAt: {
						[Op.is]: null,
					},
				},
			});

			if (character.account === account_id) {
				let new_token = await Token.createToken({
					...tokenData,
					character: character,
				});

				return {
					response: 'Character logged in!',
					responseStatus: 'success',
					token: new_token,
				};
			} else {
				return {
					response: 'Character login error.',
					responseStatus: 'error',
				};
			}
		}
	}

	static async getCharacterData(characterId) {
		return await Character.findOne({
			where: {
				id: characterId,
				deletedAt: {
					[Op.is]: null,
				},
			},
		});
	}

	static async getCharacter(data) {
		let { token, characterId } = data;

		let tokenData = await Token.characterConnected(token);

		if (tokenData.response) {
			if (!characterId) {
				characterId = tokenData.character.id;
			}

			if (characterId) {
				return this.getCharacterData(characterId);
			}
		}
	}

	static async getCharacterStats(data) {
		let { token, characterId } = data;

		let response = false,
			responseStatus = '',
			characterStatsData = {};

		let control = await Token.routeControl({
			token: token,
			account_needed: true,
			character_needed: true,
		});

		if (control.response) {
			if (await this.characterExist(characterId)) {
				characterStatsData = await Stats.findAll({
					include: [
						{
							model: CharacterStats,
							as: 'characterStatData',
							nest: true,
							raw: true,
							required: false,
							where: {
								character: characterId,
								deletedAt: {
									[Op.is]: null,
								},
							},
						},
					],
					order: [['name', 'DESC']],
				});

				response = true;
			} else {
				responseStatus = i18n.t('getCharacterStats.existence');
			}
		} else {
			responseStatus = i18n.t('permissionError');
		}

		return {
			responseStatus,
			response,
			table: characterStatsData,
		};
	}

	static async getCharacterAbility(data) {
		let { token, characterId } = data;

		let response = false,
			responseStatus = '',
			characterAbilityData = {};

		let control = await Token.routeControl({
			token: token,
			account_needed: true,
			character_needed: true,
		});

		if (control.response) {
			if (await this.characterExist(characterId)) {
				characterAbilityData = await Ability.findAll({
					include: [
						{
							model: CharacterAbility,
							as: 'characterAbilityData',
							nest: true,
							raw: true,
							required: false,
							where: {
								character: characterId,
								deletedAt: {
									[Op.is]: null,
								},
							},
						},
						{
							model: AbilityDetails,
							as: 'abilityToDetailData',
							nest: true,
							raw: true,
						},
					],
					order: [['stat', 'ASC']],
				});

				response = true;
			} else {
				responseStatus = i18n.t('getCharacterStats.existence');
			}
		} else {
			responseStatus = i18n.t('permissionError');
		}

		return {
			responseStatus,
			response,
			table: characterAbilityData,
		};
	}
}
exports.CharactersController = CharactersController;
