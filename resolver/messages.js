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
};

exports.messages = messages;
