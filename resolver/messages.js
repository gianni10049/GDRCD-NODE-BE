const { MessagesController } = require('../controllers/Messages');

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
};

exports.messages = messages;
