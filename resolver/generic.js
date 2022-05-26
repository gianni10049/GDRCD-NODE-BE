const { Token } = require('../controllers/Token');
const { GenericController } = require('../controllers/Generic');

const generic = {
	routeControl: async (data) => {
		return await Token.routeControl(data);
	},
	sendMoney: async (data) => {
		return await GenericController.sendMoney(data);
	},
	getMe: async (data) => {
		return await Token.getMe(data);
	},
};

exports.generic = generic;
