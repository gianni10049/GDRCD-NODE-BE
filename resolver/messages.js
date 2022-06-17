const { MessagesController } = require('../controllers/Messages');
const { RadioController } = require('../controllers/Radio');
const { ForumsController } = require('../controllers/Forums');

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
	getForums: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await ForumsController.getForums(data);
	},
	getPosts: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await ForumsController.getPosts(data);
	},
	getPost: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await ForumsController.getPost(data);
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
	newPost: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await ForumsController.newPost(data);
	},
	newComment: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await ForumsController.newComment(data);
	},
	updatePostClose: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await ForumsController.updatePostClose(data);
	},
	updatePostImportant: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await ForumsController.updatePostImportant(data);
	},
};

exports.messages_character = messages_character;
exports.messages_characterMutation = messages_characterMutation;
