'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class Account extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {}
	}

	Account.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			username: {
				type: Sequelize.STRING,
			},
			email: {
				type: Sequelize.STRING,
			},
			salt: {
				type: Sequelize.STRING,
			},
			password: {
				type: Sequelize.STRING,
			},
			active: {
				type: Sequelize.BOOLEAN,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'account',
			modelName: 'Account',
		}
	);
	return Account;
};
