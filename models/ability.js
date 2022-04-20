'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class Ability extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.Ability.belongsToMany(models.CharacterAbility, {
				foreignKey: 'ability',
				through: 'character_ability',
				as: 'characterAbilityData',
			});
			models.Ability.hasMany(models.AbilityDetails, {
				foreignKey: 'ability',
				name: 'id',
				allowNull: false,
				as: 'abilityToDetailData',
				onDelete: 'NO ACTION',
				onUpdate: 'CASCADE',
			});
			models.Ability.belongsTo(models.Stats, {
				foreignKey: 'stat',
				as: 'statData',
				through: 'ability_stat',
			});
		}
	}

	Ability.init(
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
			icon: {
				type: Sequelize.STRING,
			},
			stat: {
				type: Sequelize.INTEGER,
			},
			max_level: {
				type: Sequelize.INTEGER,
			},
			castable: {
				type: Sequelize.BOOLEAN,
			},
			visible: {
				type: Sequelize.BOOLEAN,
			},
			createdBy: {
				type: Sequelize.INTEGER,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'ability',
			modelName: 'Ability',
		}
	);
	return Ability;
};
