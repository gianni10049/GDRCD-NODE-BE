let { Ability } = require('./../models');
const { Token } = require('./Token');
const { AbilityDetails, Stats, CharacterAbility } = require('../models');
const { Op } = require('sequelize');

class AbilityController {
	static async getAbility(data) {
		let { token, abilityId } = data;

		let control = await Token.routeControl({
			token: token,
			account_needed: true,
			character_needed: true,
		});

		if (control.response) {
			let characterId = control.character.id;

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
	}
}
exports.AbilityController = AbilityController;
