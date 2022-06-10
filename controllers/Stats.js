let { Stats } = require('./../models');

class StatsController {
	static async listStats() {
		return await Stats.findAll();
	}
}
exports.StatsController = StatsController;
