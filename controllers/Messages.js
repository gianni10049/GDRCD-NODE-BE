const { Token } = require('./Token');
let {
	Messages,
	Character,
	MessagesRead,
	MessagesDelete,
} = require('./../models');
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

			let uniqueRecipient = _.uniqBy(messages, 'sender');

			return await uniqueRecipient.map(async (message) => {
				let new_obj = message;
				let sender = message.sender;

				let new_mex_on = await this.getNewMessages(
					control.character.id,
					sender,
					'on'
				);
				let new_mex_off = await this.getNewMessages(
					control.character.id,
					sender,
					'off'
				);

				new_obj.new_on = new_mex_on.length > 0;
				new_obj.new_off = new_mex_off.length > 0;

				return new_obj;
			});
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
				let results = await this.getMessagesQuery(
					control.character.id,
					recipient,
					type
				);

				let new_mex = await this.getNewMessages(
					control.character.id,
					recipient,
					type
				);

				await new_mex.map(async (message) => {
					await MessagesRead.create({
						message: message.id,
						character: control.character.id,
					});
				});

				return results;
			}
		}
	};

	static getNewMessages = async (sender, recipient, type) => {
		return await Messages.findAll({
			where: {
				[Op.or]: [
					{
						sender: sender,
						recipient: recipient,
					},
					{
						recipient: sender,
						sender: recipient,
					},
				],
				'$readData.id$': { [Op.eq]: null },
				'$deleteData.id$': { [Op.eq]: null },
				type: type,
			},
			include: [
				{
					model: MessagesRead,
					as: 'readData',
					required: false,
					where: {
						character: sender,
					},
				},
				{
					model: MessagesDelete,
					as: 'deleteData',
					required: false,
					where: {
						character: sender,
					},
				},
			],
			order: [['createdAt', 'DESC']],
		});
	};

	static getMessagesQuery = async (sender, recipient, type) => {
		return await Messages.findAll({
			where: {
				[Op.or]: [
					{
						sender: sender,
						recipient: recipient,
					},
					{
						recipient: sender,
						sender: recipient,
					},
				],
				type: type,
				'$deleteData.id$': { [Op.eq]: null },
			},
			include: [
				{
					model: Character,
					as: 'senderData',
					nest: true,
					raw: true,
				},
				{
					model: MessagesRead,
					as: 'readData',
					nest: true,
					raw: true,
					required: false,
					where: {
						character: sender,
					},
				},
				{
					model: MessagesDelete,
					as: 'deleteData',
					nest: true,
					raw: true,
					required: false,
					where: {
						character: sender,
					},
				},
			],
			order: [['createdAt', 'DESC']],
		});
	};

	static sendMessage = async (data) => {
		let { token, recipient, text, type } = data;

		let control = await Token.routeControl({
			token: token,
			account_needed: true,
			character_needed: true,
		});

		if (control.response) {
			if (await CharactersController.characterExist(recipient)) {
				let new_mex = await Messages.create({
					sender: control.character.id,
					recipient: recipient,
					text: text,
					type: type,
				});

				await MessagesRead.create({
					character: control.character.id,
					message: new_mex.id,
				});

				return await this.getMessagesQuery(
					control.character.id,
					recipient,
					type
				);
			}
		}
	};

	static deleteMessage = async (data) => {
		let { token, message } = data;

		let control = await Token.routeControl({
			token: token,
			account_needed: true,
			character_needed: true,
		});

		if (control.response) {
			let message_data = await Messages.findOne({
				where: {
					id: message,
				},
			});

			await MessagesDelete.create({
				message: message,
				character: control.character.id,
			});

			let recipient =
				message_data.recipient === control.character.id
					? message_data.sender
					: message_data.recipient;

			return await this.getMessagesQuery(
				control.character.id,
				recipient,
				message_data.type
			);
		}
	};
}

exports.MessagesController = MessagesController;
