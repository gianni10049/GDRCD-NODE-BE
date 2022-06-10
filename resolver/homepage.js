const { AccountController } = require('../controllers/Account');

const homepage_query = {
	login: async (tokenData, data = {}) => {
		return await AccountController.login(data);
	},
	recPass: async (tokenData, data = {}) => {
		return await AccountController.recPass(data);
	},
};

const homepage_mutation = {
	registration: async (tokenData, data = {}) => {
		return await AccountController.registration(data);
	},
};

exports.homepage_query = homepage_query;
exports.homepage_mutation = homepage_mutation;
