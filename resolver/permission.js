const { PermissionController } = require('../controllers/Permission');
const { Token } = require('./../controllers/Token');
let i18n = require('i18next');

const permission_query = {
	accountConnected: async (parent, data = {}) => {
		let { token } = data;

		let control = await Token.routeControl({
			token: token,
			account_needed: true,
			character_needed: false,
		});

		return control.response
			? control
			: new Error(i18n.t('permissionError'));
	},

	characterConnected: async (parent, data = {}) => {
		let { token } = data;

		let control = await Token.routeControl({
			token: token,
			account_needed: true,
			character_needed: true,
		});

		return control.response
			? control
			: new Error(i18n.t('permissionError'));
	},
};

const permission_mutation = {
	characterConnectedMutation: async (parent, data = {}) => {
		let { token } = data;

		let control = await Token.routeControl({
			token: token,
			account_needed: true,
			character_needed: true,
		});

		return control.response
			? control
			: new Error(i18n.t('permissionError'));
	},
};

const permission_character = {
	permissionControl: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await PermissionController.permissionControl(data);
	},
	isMineCharacter: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await PermissionController.isMineCharacter(data);
	},
};

exports.permission_query = permission_query;
exports.permission_character = permission_character;
exports.permission_mutation = permission_mutation;
