'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('permission', [
			{
				name: 'MANAGE_STAT_OTHER',
				description: 'test',
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'MANAGE_ABI_OTHER',
				description: 'test',
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'MANAGE_DAMAGES',
				description: 'test',
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'MANAGE_POSTS',
				description: 'test',
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
		]);
	},
	down: async (queryInterface) => {
		return queryInterface.bulkDelete('permission', null, {
			truncate: true,
			cascade:true
		});
	},
};
