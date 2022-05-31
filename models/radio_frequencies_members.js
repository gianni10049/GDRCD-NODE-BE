'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class RadioFrequenciesMembers extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.RadioFrequenciesMembers.belongsTo(models.Character, {
				foreignKey: 'character',
				as: 'memberData',
			});
			models.RadioFrequenciesMembers.belongsTo(models.RadioFrequencies, {
				foreignKey: 'frequency',
				as: 'frequencyData',
			});
		}
	}

	RadioFrequenciesMembers.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			character: {
				type: Sequelize.INTEGER,
			},
			frequency: {
				type: Sequelize.INTEGER,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'radio_frequencies_members',
			modelName: 'RadioFrequenciesMembers',
		}
	);
	return RadioFrequenciesMembers;
};
