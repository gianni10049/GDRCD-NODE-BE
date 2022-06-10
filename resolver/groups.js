const { GroupsController } = require('../controllers/Groups');

const groups_character = {
	getGroups: async () => {
		return await GroupsController.getGroups();
	},
	getGroup: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await GroupsController.getGroup(data);
	},
};

exports.groups_character = groups_character;
