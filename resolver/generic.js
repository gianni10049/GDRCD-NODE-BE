const { Token } = require('../controllers/Token');

const characters = {
	routeControl: async (data) => {
		return await Token.routeControl(data);
	},
};

exports.characters = characters;
