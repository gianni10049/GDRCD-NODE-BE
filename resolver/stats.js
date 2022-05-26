const { StatsController } = require('../controllers/Stats');

const stats = {
	listStats: async (data) => {
		return await StatsController.listStats(data);
	},
};

exports.stats = stats;
