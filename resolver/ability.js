const { AbilityController } = require('../controllers/Ability');

const ability_character = {
	getAbility: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await AbilityController.getAbility(data);
	},
};

const ability_characterMutation = {
	updateAbility: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await AbilityController.updateAbility(data);
	},
};

const ability_account = {};

exports.ability_character = ability_character;
exports.ability_characterMutation = ability_characterMutation;
exports.ability_account = ability_account;
