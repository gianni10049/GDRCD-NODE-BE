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

		await queryInterface.bulkInsert('stats', [
			{
				name: 'fisic',
				description_it:
					'Con Atletica si intende l’agilità e la coordinazione motoria del personaggio. Questa si usa per azioni come la corsa, la scalata, il nuoto etc. Questa abilità implica anche la percezione delle distanze e la precisione con le armi da lancio (Archi, balestre, pugnali etc) e con gli esplosivi da lancio (Granate, flashbang etc).',
				description_eng: 'TEST ENG',
				max_level: 5,
				min_level: 1,
				registration: true,
				usable: true,
				upgradable: false,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'tecnic',
				description_it:
					'Con Atletica si intende l’agilità e la coordinazione motoria del personaggio. Questa si usa per azioni come la corsa, la scalata, il nuoto etc. Questa abilità implica anche la percezione delle distanze e la precisione con le armi da lancio (Archi, balestre, pugnali etc) e con gli esplosivi da lancio (Granate, flashbang etc).',
				description_eng: 'TEST ENG',
				max_level: 5,
				min_level: 1,
				registration: true,
				usable: true,
				upgradable: false,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'mind',
				description_it:
					'Con Atletica si intende l’agilità e la coordinazione motoria del personaggio. Questa si usa per azioni come la corsa, la scalata, il nuoto etc. Questa abilità implica anche la percezione delle distanze e la precisione con le armi da lancio (Archi, balestre, pugnali etc) e con gli esplosivi da lancio (Granate, flashbang etc).',
				description_eng: 'TEST ENG',
				max_level: 5,
				min_level: 1,
				registration: true,
				usable: true,
				upgradable: false,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'perception',
				description_it:
					'Con Atletica si intende l’agilità e la coordinazione motoria del personaggio. Questa si usa per azioni come la corsa, la scalata, il nuoto etc. Questa abilità implica anche la percezione delle distanze e la precisione con le armi da lancio (Archi, balestre, pugnali etc) e con gli esplosivi da lancio (Granate, flashbang etc).',
				description_eng: 'TEST ENG',
				max_level: 5,
				min_level: 1,
				registration: true,
				usable: true,
				upgradable: false,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'social',
				description_it:
					'Con Atletica si intende l’agilità e la coordinazione motoria del personaggio. Questa si usa per azioni come la corsa, la scalata, il nuoto etc. Questa abilità implica anche la percezione delle distanze e la precisione con le armi da lancio (Archi, balestre, pugnali etc) e con gli esplosivi da lancio (Granate, flashbang etc).',
				description_eng: 'TEST ENG',
				max_level: 5,
				min_level: 1,
				registration: true,
				usable: true,
				upgradable: false,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
		]);
	},
	down: async (queryInterface) => {
		await queryInterface.dropTable('stats');
		await queryInterface.dropTable('character_stats');
	},
};
