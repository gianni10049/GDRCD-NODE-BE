'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class RadioMessages extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.RadioMessages.belongsTo(models.Character, {
				foreignKey: 'sender',
				as: 'senderData',
			});
			models.RadioMessages.belongsTo(models.RadioFrequencies, {
				foreignKey: 'frequency',
				as: 'frequencyData',
			});
			models.RadioMessages.hasMany(models.RadioRead, {
				foreignKey: 'message',
				name: 'id',
				allowNull: true,
				as: 'readData',
			});
		}
	}

	RadioMessages.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			sender: {
				type: Sequelize.INTEGER,
			},
			frequency: {
				type: Sequelize.INTEGER,
			},
			text: {
				type: Sequelize.STRING,
			},
			type: {
				type: Sequelize.STRING,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'radio_messages',
			modelName: 'RadioMessages',
		}
	);
	return RadioMessages;
};
