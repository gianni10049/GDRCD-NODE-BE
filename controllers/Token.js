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

		if (character_needed) {
			return this.characterConnected(token);
		}

		if (account_needed) {
			return this.accountConnected(token);
		}

		return {
			response,
			responseStatus,
		};
	};

	static characterConnected = async (token) => {
		let control = await this.verifyToken(token);

		let response = true,
			responseStatus = '';

		if (!control.character) {
			response = false;
			responseStatus = 'Permesso negato.';
		}

		return {
			response,
			responseStatus,
			...control,
			token,
		};
	};

	static async accountConnected(token) {
		let control = await this.verifyToken(token);

		let response = true,
			responseStatus = '';

		if (!control.account) {
			response = false;
			responseStatus = 'Permesso negato.';
		}

		return {
			response,
			responseStatus,
			...control,
			token,
		};
	}

	static async getMe(data) {
		let { tokenData } = data;

		let account, character;

		if (tokenData.account) {
			account = tokenData.account;
		}

		if (tokenData.character) {
			character = tokenData.character;
		}

		return {
			response: true,
			responseStatus: '',
			me: {
				character,
				account,
			},
		};
	}
}

exports.Token = Token;
