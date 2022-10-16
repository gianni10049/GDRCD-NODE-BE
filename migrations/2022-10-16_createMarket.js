'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('market_buy', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			object: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			total: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			remained: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			deletedAt: {
				allowNull: true,
				type: Sequelize.DATE,
				defaultValue: null,
			},
		});

		await queryInterface.createTable('market_sell', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			object: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			price:{
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			selled_to:{
				allowNull: true,
				type: Sequelize.INTEGER,
				defaultValue: null
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			deletedAt: {
				allowNull: true,
				type: Sequelize.DATE,
				defaultValue: null,
			},
		});
	},
	down: async (queryInterface) => {
		await queryInterface.dropTable('market_buy');
		await queryInterface.dropTable('market_sell');
	},
};
