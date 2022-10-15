'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {

		await queryInterface.createTable('objects', {
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
				allowNull: true,
				type: Sequelize.TEXT,
				default: null,
			},
			img: {
				allowNull: true,
				type: Sequelize.STRING,
				default: null,
			},
			type: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			quality: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			charges: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			wearable: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				default: false,
			},
			concealable: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				default: false,
			},
			customizable: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				default: false,
			},
			usable: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				default: false,
			},
			cumulative: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				default: false,
			},
			droppable: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				default: false,
			},
			creatable: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				default: false,
			},
			findable: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				default: false,
			},
			transportable: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				default: false,
			},
			sellable: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				default: false,
			},
			createdBy: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				default: false,
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
				default: null,
			},
		});

		await queryInterface.createTable('objects_list', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			owner_type:{
				allowNull: false,
				type: Sequelize.INTEGER,
				default: 1,
			},
			owner:{
				allowNull: false,
				type: Sequelize.INTEGER,
				default: 1,
			},
			object: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			quality: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			status: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			usury: {
				allowNull: false,
				type: Sequelize.INTEGER,
				default: 100,
			},
			alias: {
				allowNull: true,
				type: Sequelize.STRING,
				default: null,
			},
			img: {
				allowNull: true,
				type: Sequelize.STRING,
				default: null,
			},
			comment: {
				allowNull: true,
				type: Sequelize.TEXT,
				default: null,
			},
			comment_master: {
				allowNull: true,
				type: Sequelize.TEXT,
				default: null,
			},
			charges: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			worn: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				default: false,
			},
			worn_part: {
				allowNull: true,
				type: Sequelize.INTEGER,
				default: null,
			},
			hidden: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				default: false,
			},
			expiry: {
				allowNull: true,
				type: Sequelize.DATE,
				default: null,
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
				default: null,
			},
		});

		await queryInterface.createTable('objects_qualities', {
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
				allowNull: true,
				type: Sequelize.TEXT,
				default: null,
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
				default: null,
			},
		});

		await queryInterface.createTable('objects_status', {
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
				allowNull: true,
				type: Sequelize.TEXT,
				default: null,
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
				default: null,
			},
		});

		await queryInterface.createTable('objects_types', {
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
				allowNull: true,
				type: Sequelize.TEXT,
				default: null,
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
				default: null,
			},
		});

	},
	down: async (queryInterface) => {
		await queryInterface.dropTable('objects_list');
		await queryInterface.dropTable('objects');
		await queryInterface.dropTable('objects_qualities');
		await queryInterface.dropTable('objects_status');
		await queryInterface.dropTable('objects_types');
	},
};
