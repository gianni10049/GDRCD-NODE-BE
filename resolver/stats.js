const { StatsController } = require('../controllers/Stats');

const permission = {
	statsList: async (data) => {
		return await StatsController.statsList(data);
	},
};

exports.permission = permission;
