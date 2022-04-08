'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class CharacterPermission extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {}
	}

	CharacterPermission.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			permission: {
				type: Sequelize.INTEGER,
			},
			character: {
				type: Sequelize.INTEGER,
			},
			assigned_by: {
				type: Sequelize.INTEGER,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'character_permission',
			modelName: 'CharacterPermission',
		}
	);
	return CharacterPermission;
};
