let {
	Messages,
	Character,
	MessagesRead,
	MessagesDelete,
} = require('./../models');
const { Op } = require('sequelize');
const { _ } = require('lodash');
const { CharactersController } = require('./Characters');
const { i18n } = require('../i18n');

class MessagesController {
	static getMessagesSenders = async (data) => {
		let { tokenData } = data;

		let messages = await Messages.findAll({
			where: {
				recipient: tokenData.character.id,
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
				tokenData.character.id,
				sender,
				'on'
			);
			let new_mex_off = await this.getNewMessages(
				tokenData.character.id,
				sender,
				'off'
			);

			new_obj.new_on = new_mex_on.length > 0;
			new_obj.new_off = new_mex_off.length > 0;

			return new_obj;
		});
	};

	static getMessages = async (data) => {
		let { tokenData, recipient, type } = data;

		if (await CharactersController.characterExist(recipient)) {
			let results = await this.getMessagesQuery(
				tokenData.character.id,
				recipient,
				type
			);

			let new_mex = await this.getNewMessages(
				tokenData.character.id,
				recipient,
				type
			);

			await new_mex.map(async (message) => {
				await MessagesRead.create({
					message: message.id,
					character: tokenData.character.id,
				});
			});

			return results;
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
		let { tokenData, recipient, text, type } = data;

		if (await CharactersController.characterExist(recipient)) {
			let new_mex = await Messages.create({
				sender: tokenData.character.id,
				recipient: recipient,
				text: text,
				type: type,
			});

			await MessagesRead.create({
				character: tokenData.character.id,
				message: new_mex.id,
			});

			return await this.getMessagesQuery(
				tokenData.character.id,
				recipient,
				type
			);
		}
	};

	static deleteMessage = async (data) => {
		let { tokenData, message } = data;

		let message_data = await Messages.findOne({
			where: {
				id: message,
			},
		});

		await MessagesDelete.create({
			message: message,
			character: tokenData.character.id,
		});

		let recipient =
			message_data.recipient === tokenData.character.id
				? message_data.sender
				: message_data.recipient;

		return await this.getMessagesQuery(
			tokenData.character.id,
			recipient,
			message_data.type
		);
	};

	static deleteConv = async (data) => {
		let { tokenData, sender, type } = data;

		let response = true,
			responseStatus;

		if (await CharactersController.characterExist(sender)) {
			let messages = await this.getMessagesQuery(
				tokenData.character.id,
				sender,
				type
			);

			for (const message of messages) {
				await MessagesDelete.create({
					message: message.id,
					character: tokenData.character.id,
				});
			}

			responseStatus = i18n.t('messages.deleteConvDone');
			response = true;
		} else {
			responseStatus = i18n.t('general.characterExistence');
		}

		return { response, responseStatus };
	};
}

exports.MessagesController = MessagesController;
