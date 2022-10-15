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
			models.ObjectsList.belongsTo(models.ObjectsQualities, {
				foreignKey: 'quality',
				as: 'qualityData',
			});
			models.ObjectsList.belongsTo(models.ObjectsStatus, {
				foreignKey: 'status',
				as: 'statusData',
			});
			models.ObjectsList.belongsTo(models.Objects, {
				foreignKey: 'object',
				as: 'objectData',
			});
			models.ObjectsList.belongsTo(models.Parts, {
				foreignKey: 'worn_part',
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
