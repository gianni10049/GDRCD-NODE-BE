let { Character } = require('./../models');
let { Token } = require('./Token');

class CharactersController {
	static async getCharactersList(data) {
		let { token } = data;

		let tokenData = await Token.verifyToken(token);

		if (tokenData.account) {
			return await Character.findAll({
				where: {
					account: tokenData.account.id,
				},
			});
		}
	}

	static async setCharacter(data) {
		let { token, characterId } = data;

		let tokenData = await Token.verifyToken(token);

		if (tokenData.account) {
			let account_id = tokenData.account.id;

			let character = await Character.findOne({
				where: {
					id: characterId,
				},
			});

			if (character.account === account_id) {
				let new_token = await Token.createToken({
					...tokenData,
					character: character,
				});

				return {
					response: 'Character logged in!',
					responseStatus: 'success',
					token: new_token,
				};
			} else {
				return {
					response: 'Character login error.',
					responseStatus: 'error',
				};
			}
		}
	}
}
exports.CharactersController = CharactersController;
