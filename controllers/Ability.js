const { Token } = require('./Token');
const {
	Ability,
	AbilityDetails,
	Stats,
	CharacterAbility,
	CharacterPoints,
} = require('../models');
const { Op } = require('sequelize');
const { PermissionController } = require('./Permission');
const { Utils } = require('./Utils');
const { CharactersController } = require('./Characters');
const { i18n } = require('../i18n');

class AbilityController {
	/**
	 * @fn characterExist
	 * @note Control if a character exist
	 * @param id
	 * @return {Promise<Promise<[]> | Promise<number>>}
	 */
	static async abilityExist(id) {
		return Ability.count({
			where: {
				id: id,
				deletedAt: {
					[Op.is]: null,
				},
			},
		});
	}

	static async getAbility(data) {
		let { tokenData, abilityId, characterId } = data;

		if (!characterId) {
			characterId = tokenData.character.id;
		}

		return await Ability.findOne({
			where: {
				id: abilityId,
			},
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
				{
					model: Stats,
					as: 'statData',
					nest: true,
					raw: true,
				},
			],
			order: [
				[
					{
						model: AbilityDetails,
						as: 'abilityToDetailData',
					},
					'level',
					'ASC',
				],
			],
		});
	}

	static async getAbilityLeveDetails(data) {
		let { token, abilityId, level } = data;

		let control = await Token.routeControl({
			token: token,
			account_needed: true,
			character_needed: true,
		});

		if (control.response) {
			return await AbilityDetails.findOne({
				where: {
					ability: abilityId,
					level: level,
				},
			});
		}
	}

	static async updateAbility(data) {
		let { tokenData, characterId, abilityId } = data;

		let response = false,
			responseStatus = '';

		let permission = await PermissionController.isMineCharacter({
			token: tokenData.token,
			characterId: characterId,
		});

		if (!permission.response) {
			permission = await PermissionController.permissionControl({
				token: tokenData.token,
				permission: 'MANAGE_ABI_OTHER',
			});
		}

		if (permission.response) {
			if (await this.abilityExist(abilityId)) {
				let ability_data = await this.getAbility(data);
				let new_level = 1;
				let price;

				if (ability_data?.characterAbilityData[0]) {
					new_level = ability_data.characterAbilityData[0].value + 1;
				}

				if (new_level <= 5) {
					let detail_level = ability_data.abilityToDetailData.find(
						(e) => e.level === new_level
					);

					if (detail_level) {
						price = detail_level.price;
					} else {
						price = Utils.calcDefaultAbilityPrice(new_level);
					}

					if (price) {
						let characterData =
							await CharactersController.getCharacterPoints({
								token: tokenData.token,
								characterId,
							});

						if (characterData?.response) {
							let usable_exp = characterData?.table?.exp_usable;

							if (usable_exp >= price) {
								let new_exp = usable_exp - price;

								await CharacterAbility.upsert({
									id:
										ability_data?.characterAbilityData[0]
											?.id ?? null,
									value: new_level,
									character: characterId,
									ability: abilityId,
								});

								await CharacterPoints.update(
									{ exp_usable: new_exp },
									{
										where: {
											character: characterId,
											deletedAt: {
												[Op.is]: null,
											},
										},
									}
								);

								response = true;
								responseStatus = i18n.t('updateAbility.done');
							} else {
								responseStatus = i18n.t(
									'updateAbility.expError'
								);
							}
						} else {
							responseStatus = i18n.t(
								'updateAbility.pointsError'
							);
						}
					} else {
						responseStatus = i18n.t('updateAbility.priceError');
					}
				} else {
					responseStatus = i18n.t('updateAbility.maxLevel');
				}
			} else {
				responseStatus = i18n.t('updateAbility.existence');
			}
		}

		return {
			responseStatus,
			response,
		};
	}
}

exports.AbilityController = AbilityController;
