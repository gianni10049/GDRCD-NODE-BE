let {
	Permission,
	AccountPermissionGroup,
	AccountPermission,
	PermissionGroup,
	PermissionGroupPivot,
	Account,
	CharacterPermission,
} = require('./../models');
const { Token } = require('./Token');
const { _ } = require('lodash');
const { CharactersController } = require('./Characters');
const { i18n } = require('../i18n');

class PermissionController {
	static async permissionExist(permission) {
		let exist_control = await Permission.count({
			where: {
				name: permission,
			},
		});

		if (exist_control > 1) {
			return {
				response: false,
				responseStatus: 'Multiple permission whit same name.',
			};
		} else {
			return {
				response: Boolean(exist_control),
				responseStatus: '',
			};
		}
	}

	static async permissionGroups(tokenData) {
		return await AccountPermissionGroup.findAll({
			where: {
				account: tokenData.account.id,
			},
			include: [
				{
					model: PermissionGroup,
					as: 'permissionGroupsData',
					nest: true,
					raw: true,
					include: [
						{
							model: PermissionGroupPivot,
							as: 'permissionGroupsData',
							nest: true,
							raw: true,
						},
					],
				},
			],
		});
	}

	static async permissionAccount(tokenData) {
		return await AccountPermission.findAll({
			where: {
				account: tokenData.account.id,
			},
			include: [
				{
					model: Account,
					as: 'accountData',
					nest: true,
					raw: true,
				},
			],
		});
	}

	static async permissionCharacter(tokenData) {
		return await CharacterPermission.findAll({
			where: {
				character: tokenData.character.id,
			},
		});
	}

	static async permissionId(permission) {
		let data = await Permission.findOne({
			where: {
				name: permission,
			},
		});
		if (data) {
			return data.id;
		} else {
			return false;
		}
	}

	static async permissionGroupSuperuser(groups) {
		return _.some(groups, (el) => el.permissionGroupsData?.admin);
	}

	static async permissionInGroups(groups, permission) {
		return groups.some((el) => {
			return _.some(
				el.permissionGroupsData?.permissionGroupsData,
				(el) => el.permission === permission
			);
		});
	}

	static async permissionInAccount(tokenData, permission) {
		let accountPermissions = await this.permissionAccount(tokenData);
		return accountPermissions.some((el) => el.permission === permission);
	}

	static async permissionInCharacter(tokenData, permission) {
		let characterPermissions = await this.permissionCharacter(tokenData);
		return characterPermissions.some((el) => el.permission === permission);
	}

	static async permissionControl(data) {
		let { permission, token } = data;

		let tokenData = await Token.verifyToken(token);

		if (tokenData.account) {
			let permissionExist = await this.permissionExist(permission);

			if (permissionExist.response) {
				let permissionId = await this.permissionId(permission);

				if (permissionId) {
					let groups = await this.permissionGroups(tokenData);

					return {
						response:
							(await this.permissionGroupSuperuser(groups)) ||
							(await this.permissionInGroups(
								groups,
								permissionId
							)) ||
							(await this.permissionInAccount(
								tokenData,
								permissionId
							)) ||
							(await this.permissionInCharacter(
								tokenData,
								permissionId
							)),
						responseStatus: 'Permission Denied.',
					};
				} else {
					return {
						response: false,
						responseStatus: 'No id found for permission.',
					};
				}
			} else {
				return permissionExist;
			}
		} else {
			return {
				response: false,
				responseStatus: 'No account connected.',
			};
		}
	}

	static async isMineCharacter(data) {
		let { characterId, token } = data;

		let response = false,
			responseStatus = '';

		let tokenData = await Token.verifyToken(token);

		if (tokenData.account && tokenData.character) {
			if (await CharactersController.characterExist(characterId)) {
				if (characterId == tokenData.character.id) {
					response = true;
				} else {
					responseStatus = i18n.t('isMineCharacter.notMine');
				}
			} else {
				responseStatus = i18n.t('isMineCharacter.existence');
			}
		} else {
			responseStatus = i18n.t('permissionError');
		}

		return {
			responseStatus,
			response,
		};
	}
}

exports.PermissionController = PermissionController;
