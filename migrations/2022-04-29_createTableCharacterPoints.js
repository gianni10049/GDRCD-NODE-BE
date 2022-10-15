'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('character_points', {
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
			life: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			stamina: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			weight: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			resources: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			exp_total: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			exp_usable: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			stat_points: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			deletedAt: {
				allowNull: true,
				type: Sequelize.DATE,
				defaultValue: null,
			},
		});
	},
	down: async (queryInterface) => {
		await queryInterface.dropTable('character_points');
	},
};
