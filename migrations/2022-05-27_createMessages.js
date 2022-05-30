'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('messages', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			sender: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			recipient: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			group: {
				allowNull: true,
				type: Sequelize.INTEGER,
			},
			text: {
				allowNull: false,
				type: Sequelize.TEXT,
			},
			type: {
				allowNull: false,
				type: Sequelize.TEXT,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			deletedAt: {
				allowNull: true,
				type: Sequelize.DATE,
				default: null,
			},
		});
	},
	down: async (queryInterface) => {
		await queryInterface.dropTable('messages');
	},
};
