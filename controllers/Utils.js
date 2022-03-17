const jwt = require('jsonwebtoken');
const { Account, Character } = require('./../models');

const createToken = async (data) => {
	return await jwt.sign(data, process.env.TOKEN_KEY, undefined, undefined);
};

const verifyToken = async (token) => {
	if (!token) {
		return false;
	}

	try {
		let { account_id, character_id } = await jwt.verify(
			token,
			process.env.TOKEN_KEY,
			undefined,
			undefined
		);

		let account, character;

		if (account_id) {
			account = await Account.findOne({
				where: {
					id: account_id,
				},
			});
		}

		if (character_id) {
			character = await Character.findOne({
				where: {
					id: character_id,
				},
			});
		}

		return {
			account: account,
			character: character,
		};
	} catch (err) {
		return false;
	}
};

exports.validateToken = verifyToken;
exports.createToken = createToken;
