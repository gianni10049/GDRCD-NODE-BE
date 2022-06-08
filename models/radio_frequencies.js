'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class RadioFrequencies extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.RadioFrequencies.hasMany(models.RadioMessages, {
				foreignKey: 'frequency',
				name: 'id',
				allowNull: true,
				as: 'messageData',
			});
			models.RadioFrequencies.hasMany(models.RadioFrequenciesMembers, {
				foreignKey: 'frequency',
				name: 'id',
				allowNull: true,
				as: 'frequencyMembers',
			});
			models.RadioFrequencies.belongsTo(models.Character, {
				foreignKey: 'owner',
				as: 'ownerData',
			});
		}
	}

	RadioFrequencies.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			name: {
				type: Sequelize.STRING,
			},
			frequency: {
				type: Sequelize.INTEGER,
			},
			type: {
				type: Sequelize.STRING,
			},
			owner: {
				type: Sequelize.INTEGER,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'radio_frequencies',
			modelName: 'RadioFrequencies',
		}
	);
	return RadioFrequencies;
};
