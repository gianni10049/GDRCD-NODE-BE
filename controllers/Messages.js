const { Token } = require('./Token');
let { Messages, Character } = require('./../models');
const { Op } = require('sequelize');
const { _ } = require('lodash');
const { CharactersController } = require('./Characters');

class MessagesController {
	static getMessagesSenders = async (data) => {
		let { token } = data;

		let control = await Token.routeControl({
			token: token,
			account_needed: true,
			character_needed: true,
		});

		if (control.response) {
			let messages = await Messages.findAll({
				where: {
					recipient: control.character.id,
				},
				include: [
					{
						model: Character,
						as: 'senderData',
						nest: true,
						raw: true,
					},
				],
				order: [['createdAt', 'DESC']],
			});

			return _.uniqBy(messages, 'sender');
		}
	};

	static getMessages = async (data) => {
		let { token, recipient, type } = data;

		let control = await Token.routeControl({
			token: token,
			account_needed: true,
			character_needed: true,
		});

		if (control.response) {
			if (await CharactersController.characterExist(recipient)) {
				return await Messages.findAll({
					where: {
						[Op.or]: [
							{
								sender: control.character.id,
								recipient: recipient,
							},
							{
								recipient: control.character.id,
								sender: recipient,
							},
						],
						type: type,
					},
					include: [
						{
							model: Character,
							as: 'senderData',
							nest: true,
							raw: true,
						},
					],
					limit: 500,
					order: [['createdAt', 'DESC']],
				});
			}
		}
	};

	static sendMessage = async (data) => {
		let { token, recipient, text, type } = data;

		let control = await Token.routeControl({
			token: token,
			account_needed: true,
			character_needed: true,
		});

		console.log(type);

		if (control.response) {
			if (await CharactersController.characterExist(recipient)) {
				await Messages.create({
					sender: control.character.id,
					recipient: recipient,
					text: text,
					type: type,
				});

				return await Messages.findAll({
					where: {
						[Op.or]: [
							{
								sender: control.character.id,
								recipient: recipient,
							},
							{
								recipient: control.character.id,
								sender: recipient,
							},
						],
						type: type,
					},
					include: [
						{
							model: Character,
							as: 'senderData',
							nest: true,
							raw: true,
						},
					],
					limit: 500,
					order: [['createdAt', 'DESC']],
				});
			}
		}
	};
}

exports.MessagesController = MessagesController;
