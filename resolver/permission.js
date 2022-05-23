const { PermissionController } = require('../controllers/Permission');

const permission = {
	permissionControl: async (data) => {
		return await PermissionController.permissionControl(data);
	},
	isMineCharacter: async (data) => {
		return await PermissionController.isMineCharacter(data);
	},
};

exports.permission = permission;
