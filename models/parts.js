'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class Parts extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.Parts.hasMany(models.CharacterDamage, {
				foreignKey: 'part',
				name: 'id',
				as: 'partDamages',
			});
		}
	}

	Parts.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			name: {
				type: Sequelize.STRING,
			},
			description_it: {
				type: Sequelize.TEXT,
			},
			description_eng: {
				type: Sequelize.TEXT,
			},
			icon: {
				type: Sequelize.STRING,
			},
			max_points: {
				type: Sequelize.INTEGER,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'parts',
			modelName: 'Parts',
		}
	);
	return Parts;
};
