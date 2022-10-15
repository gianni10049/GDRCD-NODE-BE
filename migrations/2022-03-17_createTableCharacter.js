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
			account: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			nickname: {
				allowNull: true,
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
			mini_avatar: {
				allowNull: true,
				defaultValue: null,
				type: Sequelize.STRING,
			},
			profilePic: {
				allowNull: true,
				defaultValue: null,
				type: Sequelize.STRING,
			},
			active: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				defaultValue: false,
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
		await queryInterface.dropTable('character');
	},
};
