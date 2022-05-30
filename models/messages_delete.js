'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class MessagesDelete extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.MessagesDelete.belongsTo(models.Messages, {
				foreignKey: 'message',
				as: 'messageData',
			});
		}
	}

	MessagesDelete.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			message: {
				type: Sequelize.INTEGER,
			},
			character: {
				type: Sequelize.INTEGER,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'messages_delete',
			modelName: 'MessagesDelete',
		}
	);
	return MessagesDelete;
};
