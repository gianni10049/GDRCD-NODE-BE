const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const createToken = async (data) => {
	return await jwt.sign(data, process.env.TOKEN_KEY);
};

const verifyToken = async (token) => {
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

	return true;
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
