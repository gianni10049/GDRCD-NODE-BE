const { AbilityController } = require('../controllers/Ability');

const permission = {
	getAbility: async (data) => {
		return await AbilityController.getAbility(data);
	},
	updateAbility: async (data) => {
		return await AbilityController.updateAbility(data);
	},
};

exports.permission = permission;
