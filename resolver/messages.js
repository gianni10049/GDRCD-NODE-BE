const { MessagesController } = require('../controllers/Messages');
const { RadioController } = require('../controllers/Radio');

const messages = {
	getMessagesSenders: async (data) => {
		return await MessagesController.getMessagesSenders(data);
	},
	getMessages: async (data) => {
		return await MessagesController.getMessages(data);
	},
	sendMessage: async (data) => {
		return await MessagesController.sendMessage(data);
	},
	deleteMessage: async (data) => {
		return await MessagesController.deleteMessage(data);
	},
	deleteConv: async (data) => {
		return await MessagesController.deleteConv(data);
	},
	getFrequencies: async (data) => {
		return await RadioController.getFrequencies(data);
	},
	getFrequencyMessages: async (data) => {
		return await RadioController.getFrequencyMessages(data);
	},
	sendFrequencyMessage: async (data) => {
		return await RadioController.sendFrequencyMessage(data);
	},
};

exports.messages = messages;
