'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class Objects extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.Objects.belongsTo(models.ObjectsTypes, {
				foreignKey: 'type',
				as: 'typeData',
			});
			models.Objects.belongsTo(models.ObjectsQualities, {
				foreignKey: 'quality',
				as: 'qualityData',
			});
			models.Objects.hasMany(models.ObjectsList, {
				foreignKey: 'object',
				name: 'id',
				as: 'listData',
			});
		}
	}

	Objects.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			name: {
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.TEXT,
			},
			img: {
				type: Sequelize.STRING,
			},
			type: {
				type: Sequelize.INTEGER,
			},
			quality: {
				type: Sequelize.INTEGER,
			},
			charges: {
				type: Sequelize.INTEGER,
			},
			wearable: {
				type: Sequelize.BOOLEAN,
			},
			concealable: {
				type: Sequelize.BOOLEAN,
			},
			customizable: {
				type: Sequelize.BOOLEAN,
			},
			usable: {
				type: Sequelize.BOOLEAN,
			},
			cumulative: {
				type: Sequelize.BOOLEAN,
			},
			droppable: {
				type: Sequelize.BOOLEAN,
			},
			creatable: {
				type: Sequelize.BOOLEAN,
			},
			findable: {
				type: Sequelize.BOOLEAN,
			},
			transportable: {
				type: Sequelize.BOOLEAN,
			},
			sellable: {
				type: Sequelize.BOOLEAN,
			},
			marketable: {
				type: Sequelize.BOOLEAN,
			},
			price:{
				type: Sequelize.INTEGER,
			},
			createdBy:{
				type: Sequelize.INTEGER,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'objects',
			modelName: 'Objects',
		}
	);
	return Objects;
};
