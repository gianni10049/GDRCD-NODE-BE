'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class AbilityDetails extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.AbilityDetails.belongsTo(models.Ability, {
				foreignKey: 'id',
				name: 'ability',
				as: 'abilityData',
			});
		}
	}

	AbilityDetails.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			ability: {
				type: Sequelize.INTEGER,
				references: {
					model: 'ability',
					key: 'id',
				},
			},
			level: {
				type: Sequelize.INTEGER,
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
			price: {
				type: Sequelize.INTEGER,
			},
			bonus: {
				type: Sequelize.INTEGER,
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
			tableName: 'ability_details',
			modelName: 'AbilityDetails',
		}
	);
	return AbilityDetails;
};
