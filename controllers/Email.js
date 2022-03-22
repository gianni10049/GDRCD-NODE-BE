const nodemailer = require('nodemailer');
const { LogMail } = require('../models');

class Mails {
	static sendMail = async (data) => {
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

		for (let receiver of to) {
			await LogMail.create({
				from: process.env.SMTP_SENDER, // sender address
				to: receiver, // list of receivers
				subject: subject, // Subject line
				text: text, // plain text body
				html: html, // html body
			});
		}

		return true;
	};
}

exports.Mails = Mails;
