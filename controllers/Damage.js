const { i18n } = require('../i18n');
let { CharacterDamage } = require('./../models');
const { PermissionController } = require('./Permission');

class DamageController {
	// # TODO Aggiungere controllo esistenza danno
	static getDamage = async (data) => {
		let { damageId } = data;

		let response,
			responseStatus = '';

		let damage = await CharacterDamage.findOne({
			where: {
				id: damageId,
			},
		});
		response = true;

		return {
			responseStatus,
			response,
			damage: damage,
		};
	};

	// # TODO Aggiungere controllo esistenza danno
	static setDamageSolved = async (data) => {
		let { damageId } = data;

		let response = false,
			responseStatus,
			damage;

		let permission_control = await PermissionController.permissionControl({
			token,
			permission: 'MANAGE_DAMAGEs',
		});

		if (permission_control.response) {
			await CharacterDamage.update(
				{ solved: true },
				{
					where: {
						id: damageId,
					},
				}
			);

			damage = await CharacterDamage.findOne({
				where: {
					id: damageId,
				},
			});

			response = true;
			responseStatus = i18n.t('setDamageSolved.done');
		} else {
			responseStatus = i18n.t('permissionError');
		}

		return {
			responseStatus,
			response,
			damage: damage,
		};
	};
}

exports.DamageController = DamageController;
