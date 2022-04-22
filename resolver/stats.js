const { StatsController } = require('../controllers/Stats');

const permission = {
	listStats: async (data) => {
		return await StatsController.listStats(data);
	},
};

exports.permission = permission;
