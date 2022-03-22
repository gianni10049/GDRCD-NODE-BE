'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class LogMail extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {}
	}

	LogMail.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			from: {
				type: Sequelize.STRING,
			},
			to: {
				type: Sequelize.STRING,
			},
			subject: {
				type: Sequelize.STRING,
			},
			text: {
				type: Sequelize.STRING,
			},
			html: {
				type: Sequelize.STRING,
			},
			attachment: {
				type: Sequelize.STRING,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'log_email',
			modelName: 'LogMail',
		}
	);
	return LogMail;
};
