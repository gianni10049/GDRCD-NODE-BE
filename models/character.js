'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class Character extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.Character.hasMany(models.CharacterPermission, {
				foreignKey: 'character',
				name: 'id',
				allowNull: false,
				as: 'characterPermissionData',
			});
			models.Character.hasOne(models.CharacterPoints, {
				foreignKey: 'character',
				name: 'id',
				as: 'characterPoints',
			});
			models.Character.hasOne(models.CharacterDamage, {
				foreignKey: 'character',
				name: 'id',
				as: 'characterDamages',
			});
		}
	}

	Character.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			account: {
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			nickname: {
				type: Sequelize.STRING,
			},
			surname: {
				type: Sequelize.STRING,
			},
			age: {
				type: Sequelize.INTEGER,
			},
			mini_avatar: {
				type: Sequelize.STRING,
			},
			profilePic: {
				type: Sequelize.STRING,
			},
			active: {
				type: Sequelize.BOOLEAN,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'character',
			modelName: 'Character',
		}
	);
	return Character;
};
