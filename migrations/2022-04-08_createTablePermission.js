'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('permission', {
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
			description: {
				allowNull: false,
				type: Sequelize.STRING,
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

		await queryInterface.createTable('permission_group', {
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
			description: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			admin: {
				default: false,
				allowNull: false,
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

		await queryInterface.createTable('permission_group_pivot', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			group: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			permission: {
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

		await queryInterface.createTable('account_permission_group', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			group: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			account: {
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

		await queryInterface.createTable('account_permission', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			permission: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			account: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			assigned_by: {
				default: null,
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
		await queryInterface.createTable('character_permission', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			permission: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			character: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			assigned_by: {
				default: null,
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
		await queryInterface.dropTable('permission');
		await queryInterface.dropTable('permission_group');
		await queryInterface.dropTable('account_permission_group');
		await queryInterface.dropTable('account_permission');
		await queryInterface.dropTable('permission_group_pivot');
		await queryInterface.dropTable('character_permission');
	},
};