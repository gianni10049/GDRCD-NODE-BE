let { RolledDices } = require('./../models');

const schema1 = {
	hello: async () => {
		await RolledDices.create({
			rolled: 'test,test,test',
		});
	},
};

exports.schema1 = schema1;
