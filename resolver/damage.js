const { DamageController } = require('../controllers/Damage');

const damage_character = {
	getDamage: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await DamageController.getDamage(data);
	},
};

const damage_characterMutation = {
	setDamageSolved: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await DamageController.setDamageSolved(data);
	},
};

exports.damage_character = damage_character;
exports.damage_characterMutation = damage_characterMutation;
