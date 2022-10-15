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
				defaultValue: null,
			},
			img: {
				allowNull: true,
				type: Sequelize.STRING,
				defaultValue: null,
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
				defaultValue: false,
			},
			concealable: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			customizable: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			usable: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			cumulative: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			droppable: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			creatable: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			findable: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			transportable: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			sellable: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			marketable: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			createdBy: {
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
				defaultValue: 1,
			},
			owner:{
				allowNull: false,
				type: Sequelize.INTEGER,
				defaultValue: 1,
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
				defaultValue: 100,
			},
			alias: {
				allowNull: true,
				type: Sequelize.STRING,
				defaultValue: null,
			},
			img: {
				allowNull: true,
				type: Sequelize.STRING,
				defaultValue: null,
			},
			comment: {
				allowNull: true,
				type: Sequelize.TEXT,
				defaultValue: null,
			},
			comment_master: {
				allowNull: true,
				type: Sequelize.TEXT,
				defaultValue: null,
			},
			charges: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			worn: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			worn_part: {
				allowNull: true,
				type: Sequelize.INTEGER,
				defaultValue: null,
			},
			hidden: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			expiry: {
				allowNull: true,
				type: Sequelize.DATE,
				defaultValue: null,
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
				defaultValue: null,
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
				defaultValue: null,
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
				defaultValue: null,
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
		await queryInterface.dropTable('objects_list');
		await queryInterface.dropTable('objects');
		await queryInterface.dropTable('objects_qualities');
		await queryInterface.dropTable('objects_status');
		await queryInterface.dropTable('objects_types');
	},
};
