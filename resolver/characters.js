const { CharactersController } = require('../controllers/Characters');

const character_character = {
	getCharacterStats: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await CharactersController.getCharacterStats(data);
	},
	getCharacterAbility: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await CharactersController.getCharacterAbility(data);
	},
	getCharacterPoints: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await CharactersController.getCharacterPoints(data);
	},
	getCharacterActionPercentages: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await CharactersController.getCharacterActionPercentages(data);
	},
	getPartsList: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await CharactersController.getPartsList(data);
	},
	getCharDamageByPart: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await CharactersController.getCharDamageByPart(data);
	},
};

const characters_characterMutation = {};

const characters_account = {
	chactersListByAccount: async (tokenData, data) => {
		data.tokenData = tokenData;
		return await CharactersController.chactersListByAccount(data);
	},
	getCharacter: async (tokenData, data) => {
		data.tokenData = tokenData;
		return await CharactersController.getCharacter(data);
	},
	getCharactersList: async () => {
		return await CharactersController.getCharactersList();
	}
};

const characters_accountMutation = {
	setCharacter: async (tokenData, data) => {
		data.tokenData = tokenData;
		return await CharactersController.setCharacter(data);
	},
	createCharacter: async (tokenData, data) => {
		data.tokenData = tokenData;
		return await CharactersController.createCharacter(data);
	},
};

exports.character_character = character_character;
exports.characters_characterMutation = characters_characterMutation;
exports.characters_account = characters_account;
exports.characters_accountMutation = characters_accountMutation;
