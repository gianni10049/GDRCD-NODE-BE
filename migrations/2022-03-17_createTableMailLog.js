'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('log_email', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			from: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			to: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			subject: {
				allowNull: true,
				type: Sequelize.STRING,
			},
			text: {
				allowNull: true,
				type: Sequelize.STRING,
			},
			html: {
				allowNull: true,
				type: Sequelize.STRING,
			},
			attachment: {
				allowNull: true,
				type: Sequelize.STRING,
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
		await queryInterface.dropTable('log_email');
	},
};
