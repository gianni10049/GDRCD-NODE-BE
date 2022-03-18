let { Character } = require('./../models');
let { verifyToken } = require('./Utils');

class CharactersController {
	static async getCharactersList(data) {
		let token = await verifyToken(data.token);

		if (token.account) {
			return await Character.findAll({
				where: {
					account: token.account.id,
				},
			});
		}
	}
}
exports.CharactersController = CharactersController;
