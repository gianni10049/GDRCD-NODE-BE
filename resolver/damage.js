const { DamageController } = require('../controllers/Damage');

const damage = {
	getDamage: async (data) => {
		return await DamageController.getDamage(data);
	},
	setDamageSolved: async (data) => {
		return await DamageController.setDamageSolved(data);
	},
};

exports.damage = damage;
