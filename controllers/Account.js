const bcrypt = require('bcrypt');
let { Account } = require('./../models');

class AccountController {
	static validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};

	static async registration(data) {
		let { username, email, password, password_confirm } = data;

		let response,
			status = false;

		// If submitted username
		if (username) {
			let username_check = await Account.count({
				where: {
					username: username,
				},
			});

			// If username not exist
			if (!username_check) {
				// If email is valid
				if (this.validateEmail(email)) {
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
								let salt = Math.floor(Math.random() * 99);

								const hashedPassword = await bcrypt.hash(
									password,
									salt
								);

								await Account.create({
									username: username,
									salt: salt,
									email: email,
									password: hashedPassword,
									active: 1,
								});

								response = 'All Right!';
								status = true;
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
					response = 'Email not valid.';
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
}
exports.AccountController = AccountController;
