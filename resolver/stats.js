const { StatsController } = require('../controllers/Stats');

const stats_character = {
	listStats: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await StatsController.listStats(data);
	},
};

const stats_characterMutation = {
	upgradeStat: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await StatsController.upgradeStat(data);
	},
};

exports.stats_character = stats_character;
exports.stats_characterMutation = stats_characterMutation;
