'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class ObjectsList extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.ObjectsList.hasOne(models.Objects, {
				foreignKey: 'id',
				name: 'object',
				as: 'objectData',
			});
			models.ObjectsList.hasOne(models.ObjectsQualities, {
				foreignKey: 'id',
				name: 'quality',
				as: 'qualityData',
			});
			models.ObjectsList.hasOne(models.ObjectsStatus, {
				foreignKey: 'id',
				name: 'status',
				as: 'statusData',
			});
			models.ObjectsList.hasOne(models.Parts, {
				foreignKey: 'id',
				name: 'worn_part',
				as: 'partData',
			});
		}
	}

	ObjectsList.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			owner_type:{
				type: Sequelize.INTEGER,
			},
			owner:{
				type: Sequelize.INTEGER,
			},
			object: {
				type: Sequelize.INTEGER,
			},
			quality: {
				type: Sequelize.INTEGER,
			},
			status: {
				type: Sequelize.INTEGER,
			},
			usury: {
				type: Sequelize.INTEGER,
			},
			alias: {
				type: Sequelize.STRING,
			},
			img: {
				type: Sequelize.STRING,
			},
			comment: {
				type: Sequelize.TEXT,
			},
			comment_master: {
				type: Sequelize.TEXT,
			},
			charges: {
				type: Sequelize.INTEGER,
			},
			worn: {
				type: Sequelize.BOOLEAN,
			},
			worn_part: {
				type: Sequelize.INTEGER,
			},
			hidden: {
				type: Sequelize.BOOLEAN,
			},
			expiry: {
				type: Sequelize.DATE,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'objects_list',
			modelName: 'ObjectsList',
		}
	);
	return ObjectsList;
};
