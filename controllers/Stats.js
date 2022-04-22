let { Stats } = require('./../models');
const { Token } = require('./Token');

class StatsController {
	static async listStats(data) {
		let { token } = data,
			statDatas;

		let control = await Token.routeControl({
			token: token,
			account_needed: true,
			character_needed: true,
		});

		if (control.response) {
			statDatas = await Stats.findAll();
		}

		return statDatas;
	}
}
exports.StatsController = StatsController;
