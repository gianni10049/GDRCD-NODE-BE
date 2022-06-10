const { StatsController } = require('../controllers/Stats');

const stats_character = {
	listStats: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await StatsController.listStats(data);
	},
};

exports.stats_character = stats_character;
