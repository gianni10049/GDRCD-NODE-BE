const { CharactersController } = require('../controllers/Characters');

const characters = {
	charactersList: async (data) => {
		return await CharactersController.getCharactersList(data);
	},
};

exports.characters = characters;
