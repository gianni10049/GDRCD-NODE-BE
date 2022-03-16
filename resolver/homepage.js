const { AccountController } = require('../controllers/Account');

const schema1 = {
	registration: async (data) => {
		return AccountController.registration(data);
	},
};

exports.schema1 = schema1;
