'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('character', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			surname: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			age: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			active: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				default: false,
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
		await queryInterface.dropTable('character');
	},
};
