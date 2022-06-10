'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('forums', {
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
				type: Sequelize.TEXT,
			},
			logo: {
				allowNull: true,
				type: Sequelize.STRING,
			},
			type: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			visible: {
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

		await queryInterface.createTable('forums_posts', {
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
			forum: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			title: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			text: {
				allowNull: false,
				type: Sequelize.TEXT,
			},
			closed: {
				defaultValue: false,
				type: Sequelize.BOOLEAN,
			},
			important: {
				defaultValue: false,
				type: Sequelize.BOOLEAN,
			},
			visible: {
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

		await queryInterface.createTable('forums_comments', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			post: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			character: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			text: {
				allowNull: false,
				type: Sequelize.TEXT,
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

		await queryInterface.createTable('forums_reads', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			post: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			character: {
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
		await queryInterface.dropTable('forums');
		await queryInterface.dropTable('forums_posts');
		await queryInterface.dropTable('forums_comments');
		await queryInterface.dropTable('forums_reads');
	},
};
