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
			models.Stats.belongsToMany(models.Ability, {
				foreignKey: 'id',
				as: 'statData',
				through: 'ability_stat',
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
				type: Sequelize.STRING,
			},
			max_lvl: {
				type: Sequelize.INTEGER,
			},
			min_lvl: {
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
