const jwt = require('jsonwebtoken');
const { Account, Character } = require('./../models');
const nodemailer = require('nodemailer');

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

const sendMail = async (data) => {
	let { subject, to, text, html } = data;

	let transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		secure: false, // true for 465, false for other ports
		auth: {
			user: process.env.SMTP_USER, // generated ethereal user
			pass: process.env.SMTP_PASS, // generated ethereal password
		},
	});

	await transporter.sendMail({
		from: process.env.SMTP_SENDER, // sender address
		to: to.join(','), // list of receivers
		subject: subject, // Subject line
		text: text, // plain text body
		html: html, // html body
	});

	console.log('Mail Sended successfully!');
};

function makeRandomString(length) {
	var result = '';
	var characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
	}
	return result;
}

exports.verifyToken = verifyToken;
exports.createToken = createToken;
exports.sendMail = sendMail;
exports.makeRandomString = makeRandomString;
