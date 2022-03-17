const { AccountController } = require('../controllers/Account');

const homepage = {
	registration: async (data) => {
		return await AccountController.registration(data);
	},
	login: async (data) => {
		return await AccountController.login(data);
	},
};

exports.homepage = homepage;
