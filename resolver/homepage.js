const { AccountController } = require('../controllers/Account');

const homepage = {
	registration: async (data) => {
		return await AccountController.registration(data);
	},
	login: async (data) => {
		return await AccountController.login(data);
	},
	recPass: async (data) => {
		return await AccountController.recPass(data);
	},
};

exports.homepage = homepage;
