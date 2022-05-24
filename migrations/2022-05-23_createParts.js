'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('parts', {
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
			max_points: {
				type: Sequelize.INTEGER,
				default: 10,
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

		await queryInterface.createTable('character_damage', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			part: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			character: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			points: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			title: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			description: {
				allowNull: false,
				type: Sequelize.TEXT,
			},
			solved: {
				default: false,
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
		await queryInterface.dropTable('parts');
		await queryInterface.dropTable('character_damage');
	},
};
