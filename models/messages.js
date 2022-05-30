'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class Messages extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.Messages.belongsTo(models.Character, {
				foreignKey: 'recipient',
				as: 'recipientData',
			});
			models.Messages.belongsTo(models.Character, {
				foreignKey: 'sender',
				as: 'senderData',
			});
			models.Messages.hasMany(models.MessagesRead, {
				foreignKey: 'message',
				name: 'id',
				allowNull: true,
				as: 'readData',
			});
			models.Messages.hasMany(models.MessagesDelete, {
				foreignKey: 'message',
				name: 'id',
				allowNull: true,
				as: 'deleteData',
			});
		}
	}

	Messages.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			sender: {
				type: Sequelize.INTEGER,
			},
			recipient: {
				type: Sequelize.INTEGER,
			},
			group: {
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
			tableName: 'messages',
			modelName: 'Messages',
		}
	);
	return Messages;
};
