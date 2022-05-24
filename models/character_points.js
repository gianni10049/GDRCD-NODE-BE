'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class CharacterPoints extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.CharacterPoints.hasOne(models.Character, {
				foreignKey: 'id',
				name: 'character',
				as: 'characterData',
			});
		}
	}

	CharacterPoints.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			character: {
				type: Sequelize.INTEGER,
			},
			life: {
				type: Sequelize.INTEGER,
			},
			stamina: {
				type: Sequelize.INTEGER,
			},
			weight: {
				type: Sequelize.INTEGER,
			},
			resources: {
				type: Sequelize.INTEGER,
			},
			exp_total: {
				type: Sequelize.INTEGER,
			},
			exp_usable: {
				type: Sequelize.INTEGER,
			},
			stat_points: {
				type: Sequelize.INTEGER,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'character_points',
			modelName: 'CharacterPoints',
		}
	);
	return CharacterPoints;
};
