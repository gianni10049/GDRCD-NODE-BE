const jwt = require('jsonwebtoken');

class Token {
	static createToken = async (data) => {
		return await jwt.sign(data, process.env.TOKEN_KEY);
	};

	static verifyToken = async (token) => {
		if (!token) {
			return false;
		}

		try {
			return await jwt.verify(
				token,
				process.env.TOKEN_KEY,
				undefined,
				undefined
			);
		} catch (err) {
			return false;
		}
	};

	static routeControl = async (data) => {
		let { token, character_needed, account_needed } = data;

		let response = true,
			responseStatus = '';

		let control = await this.verifyToken(token);

		if (
			(character_needed && !control.character) ||
			(account_needed && !control.account)
		) {
			response = false;
			responseStatus = 'Permesso negato.';
		}

		return {
			response,
			responseStatus,
		};
	};
}

exports.Token = Token;
