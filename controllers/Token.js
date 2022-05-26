const jwt = require('jsonwebtoken');
const { i18n } = require('../i18n');

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
		};
	}

	static async getMe(data) {
		let { token } = data;

		let response = true,
			responseStatus,
			account,
			character;

		if (await this.routeControl({ token, account_needed: true })) {
			let control = await this.verifyToken(token);

			if (control.account) {
				account = control.account;
			}

			if (control.character) {
				character = control.character;
			}

			response = true;
		} else {
			responseStatus = i18n.t('permissionError');
		}

		return {
			response,
			responseStatus,
			me: {
				character,
				account,
			},
		};
	}
}

exports.Token = Token;
