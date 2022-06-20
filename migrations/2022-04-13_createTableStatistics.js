'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('stats', {
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
			description_it: {
				type: Sequelize.TEXT,
			},
			description_eng: {
				type: Sequelize.TEXT,
			},
			max_level: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			min_level: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			registration: {
				allowNull: false,
				defaultValue: true,
				type: Sequelize.BOOLEAN,
			},
			usable: {
				allowNull: false,
				defaultValue: true,
				type: Sequelize.BOOLEAN,
			},
			upgradable: {
				allowNull: false,
				defaultValue: true,
				type: Sequelize.BOOLEAN,
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

		await queryInterface.createTable('character_stats', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			character: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			stat: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			value: {
				allowNull: false,
				type: Sequelize.INTEGER,
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
		await queryInterface.dropTable('stats');
		await queryInterface.dropTable('character_stats');
	},
};
