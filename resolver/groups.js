const { GroupsController } = require('../controllers/Groups');

const groups = {
	getGroups: async (data) => {
		return await GroupsController.getGroups(data);
	},
	getGroup: async (data) => {
		return await GroupsController.getGroup(data);
	},
};

exports.groups = groups;
