const { CharactersController } = require('../controllers/Characters');

const characters = {
	getCharacter: async (data) => {
		return await CharactersController.getCharacter(data);
	},
	charactersList: async (data) => {
		return await CharactersController.getCharactersList(data);
	},
	setCharacter: async (data) => {
		return await CharactersController.setCharacter(data);
	},
};

exports.characters = characters;
