const { Token } = require('../controllers/Token');

const characters = {
	tokenControl: async (data) => {
		return await Token.routeControl(data);
	},
};

exports.characters = characters;
