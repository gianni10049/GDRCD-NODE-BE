const bcrypt = require('bcrypt');
let { Account } = require('./../models');
const { Mails } = require('./Email');
const { Utils } = require('./Utils');
const { Token } = require('./Token');
const { Op } = require('sequelize');

console.log(Op);

class AccountController {
	static validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};

	static async registration(data) {
		let { username, email, password, password_confirm } = data;

		let response,
			status = 'error';

		// If submitted username
		if (username && password) {
			let username_check = await Account.count({
				where: {
					username: username,
					deletedAt: {
						[Op.is]: null,
					},
				},
			});

			// If username not exist
			if (!username_check) {
				// If email is valid

				let email_check = await Account.count({
					where: {
						email: email,
						deletedAt: {
							[Op.is]: null,
						},
					},
				});

				if (!email_check) {
					// If password and confirm are the same
					if (password === password_confirm) {
						// Password min 8 char
						if (password.length >= 8) {
							// 1 Number, 1 lower, 1 upper
							if (
								/\d/.test(password) &&
								/[a-z]/g.test(password) &&
								/[A-Z]/g.test(password)
							) {
								const hashedPassword = await bcrypt.hash(
									password,
									5
								);

								await Account.create({
									username: username,
									email: email,
									password: hashedPassword,
									active: 1,
								});

								response = 'Registered!';
								status = 'success';
							} else {
								response =
									'Password error. One small letter, one big letter and one number needed.';
							}
						} else {
							response =
								'Password length error. Minimum 8 characters.';
						}
					} else {
						response = 'Password not the sames.';
					}
				} else {
					response = 'Email alredy used.';
				}
			} else {
				response = 'Username alredy used.';
			}
		} else {
			response = 'Username not provided.';
		}

		return {
			response: response,
			responseStatus: status,
		};
	}

	static async login(data) {
		let { username, password } = data;

		let response,
			token,
			status = 'error';

		if (username && password) {
			let account_data = await Account.findOne({
				where: {
					username: username,
					deletedAt: {
						[Op.is]: null,
					},
				},
			});

			if (account_data) {
				let hashed_pass = account_data.password,
					check = await bcrypt.compare(password, hashed_pass);

				if (check) {
					account_data.password = undefined;

					token = await Token.createToken({ account: account_data });

					response = 'Logged in!';
					status = 'success';
				} else {
					response = 'Wrong password.';
				}
			} else {
				response = 'Username not exist.';
			}
		} else {
			response = 'Fullfill all input.';
		}

		return {
			token: token,
			response: response,
			responseStatus: status,
		};
	}

	static async recPass(data) {
		let { email } = data,
			response,
			responseStatus = 'error';

		if (email) {
			let account = await Account.findOne({
				where: {
					email: email,
					deletedAt: {
						[Op.is]: null,
					},
				},
			});

			if (account) {
				let password = Utils.makeRandomString(8);

				const hashedPassword = await bcrypt.hash(password, 5);

				await Account.update(
					{ password: hashedPassword },
					{
						where: {
							id: account.id,
							deletedAt: {
								[Op.is]: null,
							},
						},
					}
				);

				await Mails.sendMail({
					subject: 'Recupero password account.',
					to: [email],
					html: `La tua nuova password è "${password}".`,
				});

				response = 'Email sended successfully!';
				responseStatus = 'success';
			} else {
				response = 'Email not associated with any account.';
			}
		} else {
			response = 'Not email provided.';
		}

		return {
			response: response,
			responseStatus: responseStatus,
		};
	}
}
exports.AccountController = AccountController;
