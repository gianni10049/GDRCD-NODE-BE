const { MessagesController } = require('../controllers/Messages');
const { RadioController } = require('../controllers/Radio');

const messages_character = {
	getMessagesSenders: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await MessagesController.getMessagesSenders(data);
	},
	getMessages: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await MessagesController.getMessages(data);
	},
	getFrequencies: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await RadioController.getFrequencies(data);
	},
	getFrequencyMessages: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await RadioController.getFrequencyMessages(data);
	},
};

const messages_characterMutation = {
	sendMessage: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await MessagesController.sendMessage(data);
	},
	deleteMessage: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await MessagesController.deleteMessage(data);
	},
	deleteConv: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await MessagesController.deleteConv(data);
	},
	sendFrequencyMessage: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await RadioController.sendFrequencyMessage(data);
	},
};

exports.messages_character = messages_character;
exports.messages_characterMutation = messages_characterMutation;
