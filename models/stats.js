'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class Stats extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.Stats.hasMany(models.Ability, {
				foreignKey: 'stat',
				name: 'id',
				as: 'abilityStatData',
			});
			models.Stats.hasMany(models.CharacterStats, {
				foreignKey: 'stat',
				name: 'id',
				as: 'characterStatData',
			});
		}
	}

	Stats.init(
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
				type: Sequelize.VIRTUAL,
				get() {
					return {
						eng: this.description_eng,
						it: this.description_it,
					};
				},
			},
			description_it: {
				type: Sequelize.TEXT,
			},
			description_eng: {
				type: Sequelize.TEXT,
			},
			max_level: {
				type: Sequelize.INTEGER,
			},
			min_level: {
				type: Sequelize.INTEGER,
			},
			registration: {
				type: Sequelize.BOOLEAN,
			},
			usable: {
				type: Sequelize.BOOLEAN,
			},
			upgradable: {
				type: Sequelize.BOOLEAN,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'stats',
			modelName: 'Stats',
		}
	);
	return Stats;
};
