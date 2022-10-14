'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('forums_categories', [
			{
				title: 'Accampamento',
				order: 1,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				title: 'Esterno',
				order: 2,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				title: 'Razziatori',
				order: 3,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
		]);

		await queryInterface.bulkInsert('forums', [
			{
				name: 'OFF',
				description:
					'test OFF',
				logo: 'testOff.png',
				category: 1,
				type: 'public',
				owner: null,
				visible: true,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'ON',
				description:
					'test ON',
				logo: 'testON.png',
				category: 1,
				type: 'public',
				owner: null,
				visible: true,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'OFF',
				description:
					'test OFF',
				logo: 'testOff.png',
				category: 2,
				type: 'public',
				owner: null,
				visible: true,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'ON',
				description:
					'test ON',
				logo: 'testON.png',
				category: 2,
				type: 'public',
				owner: null,
				visible: true,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'OFF',
				description:
					'test OFF',
				logo: 'testOff.png',
				category: 3,
				type: 'public',
				owner: null,
				visible: true,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'ON',
				description:
					'test ON',
				logo: 'testON.png',
				category: 3,
				type: 'public',
				owner: null,
				visible: true,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
		]);
	},
	down: async (queryInterface) => {
		await queryInterface.bulkDelete('forums', null, {
			truncate: true,
			cascade: true,
		});
	},
};
