const { Token } = require('./Token');
const { i18n } = require('../i18n');
let { CharacterDamage } = require('./../models');
const { PermissionController } = require('./Permission');

class DamageController {
	static getDamage = async (data) => {
		let { token, damageId } = data;

		let response = false,
			responseStatus = '',
			damage;

		let tokenData = await Token.characterConnected(token);

		if (tokenData.response) {
			damage = await CharacterDamage.findOne({
				where: {
					id: damageId,
				},
			});
			response = true;
		} else {
			responseStatus = i18n.t('permissionError');
		}

		return {
			responseStatus,
			response,
			damage: damage,
		};
	};

	static setDamageSolved = async (data) => {
		let { token, damageId } = data;

		let response = false,
			responseStatus,
			damage;

		let tokenData = await Token.characterConnected(token);
		let permission_control = await PermissionController.permissionControl({
			token,
			permission: 'MANAGE_DAMAGEs',
		});

		if (tokenData.response) {
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
