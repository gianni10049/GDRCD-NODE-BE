const { CharactersController } = require('../controllers/Characters');

const characters = {
	charactersList: async (data) => {
		return await CharactersController.getCharactersList(data);
	},
	setCharacter: async (data) => {
		return await CharactersController.setCharacter(data);
	},
};

exports.characters = characters;
