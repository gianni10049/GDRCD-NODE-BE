const { AbilityController } = require('../controllers/Ability');

const permission = {
	getAbility: async (data) => {
		return await AbilityController.getAbility(data);
	},
};

exports.permission = permission;
