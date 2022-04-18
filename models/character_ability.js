'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class CharacterAbility extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.CharacterAbility.hasOne(models.Character, {
				foreignKey: 'id',
				name: 'character',
				allowNull: false,
				as: 'characterData',
			});
			models.CharacterAbility.hasOne(models.Ability, {
				foreignKey: 'id',
				name: 'ability',
				allowNull: false,
				as: 'abilityData',
			});
		}
	}

	CharacterAbility.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			character: {
				type: Sequelize.INTEGER,
			},
			ability: {
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
			tableName: 'character_ability',
			modelName: 'CharacterAbility',
		}
	);
	return CharacterAbility;
};
