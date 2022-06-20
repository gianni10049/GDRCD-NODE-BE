'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('ability', {
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
				allowNull: false,
				type: Sequelize.TEXT,
			},
			description_eng: {
				allowNull: false,
				type: Sequelize.TEXT,
			},
			icon: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			stat: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			max_level: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			castable: {
				allowNull: false,
				defaultValue: true,
				type: Sequelize.BOOLEAN,
			},
			visible: {
				allowNull: false,
				defaultValue: true,
				type: Sequelize.BOOLEAN,
			},
			life_calc: {
				allowNull: true,
				defaultValue: false,
				type: Sequelize.BOOLEAN,
			},
			stamina_calc: {
				allowNull: true,
				defaultValue: false,
				type: Sequelize.BOOLEAN,
			},
			find_calc: {
				allowNull: true,
				defaultValue: false,
				type: Sequelize.BOOLEAN,
			},
			furtivity_calc: {
				allowNull: true,
				defaultValue: false,
				type: Sequelize.BOOLEAN,
			},
			investigate_calc: {
				allowNull: true,
				defaultValue: false,
				type: Sequelize.BOOLEAN,
			},
			initiative_calc: {
				allowNull: true,
				defaultValue: false,
				type: Sequelize.BOOLEAN,
			},
			price_calc: {
				allowNull: true,
				defaultValue: false,
				type: Sequelize.BOOLEAN,
			},
			research_calc: {
				allowNull: true,
				defaultValue: false,
				type: Sequelize.BOOLEAN,
			},
			createdBy: {
				allowNull: true,
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

		await queryInterface.createTable('ability_details', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			ability: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			level: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			description_it: {
				allowNull: false,
				type: Sequelize.TEXT,
			},
			description_eng: {
				allowNull: false,
				type: Sequelize.TEXT,
			},
			price: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			bonus: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			createdBy: {
				allowNull: true,
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

		await queryInterface.createTable('character_ability', {
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
			ability: {
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
		await queryInterface.dropTable('ability_details');
		await queryInterface.dropTable('character_ability');
		await queryInterface.dropTable('ability');
	},
};
