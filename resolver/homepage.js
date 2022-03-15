let { Account } = require('./../models');

const schema1 = {
	registration: async () => {
		await Account.create({
			username: 'testAccount',
			email: 'test@test.it',
			password: 'brobro',
			active: 1,
		});

		return 'Hello World!';
	},
};

exports.schema1 = schema1;
