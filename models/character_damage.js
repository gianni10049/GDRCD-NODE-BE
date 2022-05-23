'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class CharacterDamage extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.CharacterDamage.hasOne(models.Character, {
				foreignKey: 'id',
				name: 'character',
				as: 'characterData',
			});
			models.CharacterDamage.belongsTo(models.Parts, {
				foreignKey: 'part',
				as: 'partData',
			});
		}
	}

	CharacterDamage.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			part: {
				type: Sequelize.INTEGER,
			},
			character: {
				type: Sequelize.INTEGER,
			},
			points: {
				type: Sequelize.INTEGER,
			},
			description: {
				type: Sequelize.TEXT,
			},
			solved: {
				type: Sequelize.BOOLEAN,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'character_damage',
			modelName: 'CharacterDamage',
		}
	);
	return CharacterDamage;
};
