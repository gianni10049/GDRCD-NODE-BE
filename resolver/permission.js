const { PermissionController } = require('../controllers/Permission');

const permission = {
	permissionControl: async (data) => {
		return await PermissionController.permissionControl(data);
	},
};

exports.permission = permission;
