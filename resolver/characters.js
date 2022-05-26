const { CharactersController } = require('../controllers/Characters');

const characters = {
	getCharacter: async (data) => {
		return await CharactersController.getCharacter(data);
	},
	chactersListByAccount: async (data) => {
		return await CharactersController.chactersListByAccount(data);
	},
	setCharacter: async (data) => {
		return await CharactersController.setCharacter(data);
	},
	getCharacterStats: async (data) => {
		return await CharactersController.getCharacterStats(data);
	},
	getCharacterAbility: async (data) => {
		return await CharactersController.getCharacterAbility(data);
	},
	getCharacterPoints: async (data) => {
		return await CharactersController.getCharacterPoints(data);
	},
	getCharacterActionPercentages: async (data) => {
		return await CharactersController.getCharacterActionPercentages(data);
	},
	getPartsList: async (data) => {
		return await CharactersController.getPartsList(data);
	},
	getCharDamageByPart: async (data) => {
		return await CharactersController.getCharDamageByPart(data);
	},
	getCharactersList: async (data) => {
		return await CharactersController.getCharactersList(data);
	},
};

exports.characters = characters;
