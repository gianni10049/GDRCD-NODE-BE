const { AbilityController } = require('../controllers/Ability');

const ability = {
	getAbility: async (data) => {
		return await AbilityController.getAbility(data);
	},
	updateAbility: async (data) => {
		return await AbilityController.updateAbility(data);
	},
};

exports.ability = ability;
