let {
	Character,
	CharacterStats,
	Stats,
	CharacterAbility,
	Ability,
	AbilityDetails,
	CharacterPoints,
	Parts,
	CharacterDamage,
} = require('./../models');
let { Token } = require('./Token');
const { Op } = require('sequelize');
const { i18n } = require('../i18n');

class CharactersController {
	/*** TABLE HELPER ***/

	/**
	 * @fn queryCharacterData
	 * @note Obtain character base data from db
	 * @param characterId
	 * @return {Promise<Model<any>>}
	 */
	static async queryCharacterData(characterId) {
		return await Character.findOne({
			where: {
				id: characterId,
				deletedAt: {
					[Op.is]: null,
				},
			},
		});
	}

	/**** CONTROLS ****/

	/**
	 * @fn characterExist
	 * @note Control if a character exist
	 * @param id
	 * @return {Promise<Promise<[]> | Promise<number>>}
	 */
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

	/**** FUNCTIONS ***/

	/**
	 * @fn setCharacter
	 * @note Create a token for set a character in local storage
	 * @param data
	 * @return {Promise<{response: string, responseStatus: string}|{response: string, responseStatus: string, token: (*)}>}
	 */
	static async setCharacter(data) {
		let { tokenData, characterId } = data;

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

	/**
	 * @fn calcPercentage
	 * @note Calc a percentage for a specific type
	 * @param type
	 * @param characterId
	 * @return {Promise<number|number>}
	 */
	static async calcPercentage(type, characterId) {
		const max_value = 75;

		let whereAbility = {},
			total = 0,
			total_reachable_points;

		whereAbility[type] = true;

		let characterAbilityData = await Ability.findAll({
			where: whereAbility,
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
					model: Stats,
					as: 'statData',
					nest: true,
					raw: true,
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
				},
			],
		});

		let number_of_ability = characterAbilityData.length;

		total_reachable_points = 10 * number_of_ability;

		await characterAbilityData.map((ability) => {
			let stat = ability.statData;
			let stat_value = stat?.characterStatData[0]?.value;
			let abi_value = ability?.characterAbilityData[0]?.value ?? 0;

			total += stat_value + abi_value;
		});

		let percentage_value = Math.floor(
			(max_value / 100) * ((total / total_reachable_points) * 100)
		);

		return {
			total: percentage_value > max_value ? max_value : percentage_value,
			max_value: total_reachable_points,
		};
	}

	/**** GETTER ****/

	/**
	 * @fn getCharactersList
	 * @note Extract list of characters by account id
	 * @param data
	 * @return {Promise<Model[]>}
	 */
	static async chactersListByAccount(data) {
		let { tokenData } = data;

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

	/**
	 *
	 * @param data
	 * @return {Promise<Model<*>>}
	 */
	static async getCharacter(data) {
		let { tokenData, characterId } = data;

		if (!characterId) {
			characterId = tokenData.character.id;
		}

		if (characterId) {
			return this.queryCharacterData(characterId);
		}
	}

	/**
	 * @fn getCharacterStats
	 * @note Obtain character stats
	 * @param data
	 * @return {Promise<{response: boolean, responseStatus: string, table: {}}>}
	 */
	static async getCharacterStats(data) {
		let { characterId } = data;

		let response = false,
			responseStatus = '',
			characterStatsData = {};

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

		return {
			responseStatus,
			response,
			table: characterStatsData,
		};
	}

	/**
	 * @fn  getCharacterAbility
	 * @note Obtain character abilities
	 * @param data
	 * @return {Promise<{response: boolean, responseStatus: string, table: {}}>}
	 */
	static async getCharacterAbility(data) {
		let { characterId } = data;

		let response = false,
			responseStatus = '',
			characterAbilityData = {};

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

		return {
			responseStatus,
			response,
			table: characterAbilityData,
		};
	}

	/**
	 * @fn getCharacterPoints
	 * @note Obtain character points
	 * @param data
	 * @return {Promise<{response: boolean, responseStatus: string, table: {}}>}
	 */
	static async getCharacterPoints(data) {
		let { characterId } = data;

		let response = false,
			responseStatus = '',
			characterPoints = {};

		if (await this.characterExist(characterId)) {
			characterPoints = await CharacterPoints.findOne({
				where: {
					character: characterId,
					deletedAt: {
						[Op.is]: null,
					},
				},
			});

			response = true;
		} else {
			responseStatus = i18n.t('getCharacterStats.existence');
		}

		return {
			responseStatus,
			response,
			table: characterPoints,
		};
	}

	/**
	 * @fn getCharacterActionPercentages
	 * @note Obtain character percentages. Single if passed an action
	 * @param data
	 * @return {Promise<{response: boolean, percentages: [], responseStatus: string}>}
	 */
	static async getCharacterActionPercentages(data) {
		let { characterId, action } = data;

		let response = false,
			responseStatus = '',
			characterPercentage = [];

		if (await this.characterExist(characterId)) {
			let types = [
				'life_calc',
				'stamina_calc',
				'find_calc',
				'furtivity_calc',
				'investigate_calc',
				'initiative_calc',
				'price_calc',
				'research_calc',
			];

			if (action) {
				characterPercentage[action] = await this.calcPercentage(
					action,
					characterId
				);
			} else {
				for (const type of types) {
					characterPercentage[type] = await this.calcPercentage(
						type,
						characterId
					);
				}
			}

			response = true;
		} else {
			responseStatus = i18n.t('getCharacterStats.existence');
		}

		return {
			responseStatus,
			response,
			percentages: characterPercentage,
			character: characterId,
		};
	}

	static async getPartsList(data) {
		let { characterId } = data;

		let response = false,
			responseStatus = '',
			parts = [];

		if (await this.characterExist(characterId)) {
			parts = await Parts.findAll({
				where: true,
				include: [
					{
						model: CharacterDamage,
						as: 'partDamages',
						nest: true,
						raw: true,
						required: false,
						where: {
							character: characterId,
							solved: false,
							deletedAt: {
								[Op.is]: null,
							},
						},
					},
				],
			});
		} else {
			responseStatus = i18n.t('getCharacterStats.existence');
		}

		return {
			responseStatus,
			response,
			table: parts,
		};
	}

	static async getCharDamageByPart(data) {
		let { characterId, partId } = data;

		let response = false,
			responseStatus = '',
			damages = [];

		if (await this.characterExist(characterId)) {
			damages = await CharacterDamage.findAll({
				where: {
					character: characterId,
					part: partId,
					solved: false,
					deletedAt: {
						[Op.is]: null,
					},
				},
			});
		} else {
			responseStatus = i18n.t('getCharacterStats.existence');
		}

		return {
			responseStatus,
			response,
			damages: damages,
		};
	}

	static async getCharactersList() {
		return await Character.findAll({
			where: true,
			order: [['name', 'ASC']],
		});
	}
}

exports.CharactersController = CharactersController;
