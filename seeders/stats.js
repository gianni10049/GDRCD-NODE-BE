'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
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
		await queryInterface.bulkDelete('stats', null, {
			truncate: true,
			cascade:true
		});
	},
};
