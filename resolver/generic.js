const { Token } = require('../controllers/Token');
const { GenericController } = require('../controllers/Generic');

const generic_query = {
	routeControl: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await Token.routeControl(data);
	},
};

const generic_account = {
	getMe: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await Token.getMe(data);
	},
};

const generic_characterMutation = {
	sendMoney: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await GenericController.sendMoney(data);
	},
};

exports.generic_query = generic_query;
exports.generic_account = generic_account;
exports.generic_characterMutation = generic_characterMutation;
