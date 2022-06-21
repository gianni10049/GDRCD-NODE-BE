let { Stats, CharacterPoints, CharacterStats } = require('./../models');
const { i18n } = require('../i18n');
const { Sequelize } = require('sequelize');

class StatsController {
	static async listStats() {
		return await Stats.findAll();
	}

	static async updateStat(args) {
		let { character, stat } = args;

		let response = false,
			responseStatus;

		let points = await CharacterPoints.findOne({
			where: {
				character: character,
			},
		});

		if (points) {
			let stat_points = points?.stat_points;


			if (stat_points > 0) {

				let char_stat = await CharacterStats.findOne({
					where: {
						character,
						stat,
					},
				});

				if (char_stat) {
					let next_level = Number(char_stat.value + 1);

					if( next_level > 0 && next_level < 6 ) {
						await CharacterStats.update({
							value: Number(char_stat.value + 1),
						}, {
							where: {
								character,
								stat,
							},
						});

						await CharacterPoints.update({
							stat_points: Sequelize.literal(`stat_points-'1'`),
						}, {
							where:{
								character
							},
						});

						response = true;
						responseStatus = i18n.t('updateStat.done');
					}
					else{
						responseStatus = i18n.t('updateStat.maxLevel');
					}
				} else {
					await CharacterStats.create({
						character,
						stat,
						value: 1,
					});

					await CharacterPoints.update({
						stat_points: Sequelize.literal(`stat_points-'1'`),
					}, {
						where:{
							character
						},
					});

					response = true;
					responseStatus = i18n.t('updateStat.done');
				}
			} else {
				responseStatus = i18n.t('updateStat.pointsNeeded');
			}

		} else {
			responseStatus = i18n.t('updateStat.NoPoints');
		}

		return {
			response,
			responseStatus,
		};
	}
}

exports.StatsController = StatsController;
