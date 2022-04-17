'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class CharacterStats extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.CharacterStats.hasOne(models.Character, {
				foreignKey: 'id',
				name: 'character',
				allowNull: false,
				as: 'characterData',
			});
			models.CharacterStats.hasOne(models.Stats, {
				foreignKey: 'id',
				name: 'stat',
				allowNull: false,
				as: 'statData',
			});
		}
	}

	CharacterStats.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			character: {
				type: Sequelize.INTEGER,
			},
			stat: {
				type: Sequelize.INTEGER,
			},
			value: {
				type: Sequelize.INTEGER,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'character_stats',
			modelName: 'CharacterStats',
		}
	);
	return CharacterStats;
};
