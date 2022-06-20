'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('parts', [
			{
				name: 'head',
				description_it: 'Testa',
				description_eng: 'Head',
				icon: 'Head',
				max_points: 10,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'rightArm',
				description_it: 'Braccio destro',
				description_eng: 'ENG',
				icon: 'RightArm',
				max_points: 10,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'leftArm',
				description_it: 'Braccio Sinistro',
				description_eng: 'ENG',
				icon: 'LeftArm',
				max_points: 10,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'chest',
				description_it: 'Schiena',
				description_eng: 'ENG',
				icon: 'Chest',
				max_points: 10,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'leftLeg',
				description_it: 'Schiena',
				description_eng: 'ENG',
				icon: 'LeftLeg',
				max_points: 10,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
			{
				name: 'rightLeg',
				description_it: 'Schiena',
				description_eng: 'ENG',
				icon: 'RightLeg',
				max_points: 10,
				createdAt: Sequelize.fn('NOW'),
				updatedAt: Sequelize.fn('NOW'),
			},
		]);
	},
	down: async (queryInterface) => {
		return queryInterface.bulkDelete('parts', null, {
			truncate: true,
			cascade:true
		});
	},
};
