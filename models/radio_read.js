'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class RadioRead extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.RadioRead.belongsTo(models.RadioMessages, {
				foreignKey: 'message',
				as: 'messageData',
			});
		}
	}

	RadioRead.init(
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
			tableName: 'radio_read',
			modelName: 'RadioRead',
		}
	);
	return RadioRead;
};
