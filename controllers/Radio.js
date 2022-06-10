let {
	RadioMessages,
	RadioFrequencies,
	RadioFrequenciesMembers,
	RadioRead,
} = require('./../models');
const { Op, Sequelize } = require('sequelize');
const { i18n } = require('../i18n');
const { Character } = require('../models');

class RadioController {
	static getFrequencyMessagesQuery = async (frequency) => {
		return await RadioMessages.findAll({
			where: {
				frequency: frequency,
				deletedAt: {
					[Op.is]: null,
				},
				createdAt: {
					[Op.gte]: Sequelize.literal(
						'DATE_SUB(NOW(), INTERVAL 10 MINUTE)'
					),
				},
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
	};

	static getFrequencyNotReadedMessagesQuery = async (
		frequency,
		character
	) => {
		return await RadioMessages.findAll({
			where: {
				frequency: frequency,
				deletedAt: {
					[Op.is]: null,
				},
				createdAt: {
					[Op.gte]: Sequelize.literal(
						'DATE_SUB(NOW(), INTERVAL 50 MINUTE)'
					),
				},
				'$readData.id$': { [Op.eq]: null },
			},
			include: [
				{
					model: RadioRead,
					as: 'readData',
					required: false,
					where: {
						character: character,
					},
				},
			],
			order: [['createdAt', 'DESC']],
		});
	};

	static getFrequencyDataQuery = async (frequency) => {
		return await RadioFrequencies.findOne({
			where: {
				frequency,
				deletedAt: {
					[Op.is]: null,
				},
			},
		});
	};

	static getFrequenciesQuery = async () => {
		return await RadioFrequencies.findAll({
			where: {
				deletedAt: {
					[Op.is]: null,
				},
			},
			order: [['type', 'ASC']],
		});
	};

	static getFrequencies = async (data) => {
		let { tokenData } = data;

		let frequencies = await this.getFrequenciesQuery();
		let new_frequencies = [];

		for (let frequency of frequencies) {
			if (
				await this.frequencyPermission(
					frequency.frequency,
					tokenData.character.id
				)
			) {
				new_frequencies.push(frequency);
			}
		}

		return new_frequencies;
	};

	static frequencyPermission = async (frequency, me) => {
		let frequency_data = await this.getFrequencyDataQuery(frequency);

		if (frequency_data) {
			switch (frequency_data.type) {
				case 'groups':
					// # TODO Aggiungere regole gruppi
					return false;
				case 'private':
					if (frequency_data.owner === me) {
						return true;
					} else {
						let member_data = await RadioFrequenciesMembers.findOne(
							{
								where: {
									frequency: frequency,
									character: me,
								},
							}
						);

						if (member_data) {
							return true;
						}
					}
					return false;
				case 'public':
					return true;
				default:
					return false;
			}
		} else {
			return true;
		}
	};

	static getFrequencyMessages = async (data) => {
		let { tokenData, frequency } = data;

		let response = false,
			responseStatus = '',
			frequency_data,
			messages;

		if (await this.frequencyPermission(frequency, tokenData.character.id)) {
			frequency_data = await this.getFrequencyDataQuery(frequency);

			messages = await this.getFrequencyMessagesQuery(frequency);

			this.updateReads(frequency, tokenData.character.id).then(() => {});

			response = true;
		} else {
			responseStatus = i18n.t('permissionError');
		}

		return {
			response,
			responseStatus,
			frequency: frequency_data,
			messages,
		};
	};

	static sendFrequencyMessage = async (data) => {
		let { tokenData, text, frequency } = data;

		await RadioMessages.create({
			sender: tokenData.character.id,
			frequency: frequency,
			text: text,
			type: 'normal',
		});

		return await this.getFrequencyMessagesQuery(frequency);
	};

	static updateReads = async (frequency, character) => {
		let messages = await this.getFrequencyNotReadedMessagesQuery(
			frequency,
			character
		);

		for (const message of messages) {
			RadioRead.create({
				message: message.id,
				character,
			});
		}
	};
}

exports.RadioController = RadioController;
