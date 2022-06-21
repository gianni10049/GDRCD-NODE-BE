const { StatsController } = require('../controllers/Stats');

const stats_character = {
	listStats: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await StatsController.listStats(data);
	},
};

const stats_characterMutation = {
	updateStat: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await StatsController.updateStat(data);
	},
};

exports.stats_character = stats_character;
exports.stats_characterMutation = stats_characterMutation;
