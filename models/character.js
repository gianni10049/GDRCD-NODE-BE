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
			models.Character.hasMany(models.Messages, {
				foreignKey: 'recipient',
				name: 'id',
				allowNull: false,
				as: 'messagesRecipientData',
			});
			models.Character.hasMany(models.Messages, {
				foreignKey: 'sender',
				name: 'id',
				allowNull: false,
				as: 'messagesSenderData',
			});
			models.Character.hasMany(models.RadioMessages, {
				foreignKey: 'sender',
				name: 'id',
				allowNull: false,
				as: 'radioMessagesSenderData',
			});
			models.Character.hasMany(models.RadioFrequencies, {
				foreignKey: 'owner',
				name: 'id',
				allowNull: false,
				as: 'radioFrequencyOwnerData',
			});
			models.Character.hasMany(models.RadioFrequenciesMembers, {
				foreignKey: 'character',
				name: 'id',
				allowNull: false,
				as: 'radioFrequencyMembersData',
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
			models.Character.hasOne(models.GroupsMembers, {
				foreignKey: 'character',
				name: 'id',
				as: 'groupMembers',
			});
			models.Character.hasOne(models.ForumsPosts, {
				foreignKey: 'character',
				name: 'id',
				as: 'postsData',
			});
			models.Character.hasOne(models.ForumsComments, {
				foreignKey: 'character',
				name: 'id',
				as: 'commentsData',
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
			fullname: {
				type: Sequelize.VIRTUAL,
				get() {
					return `${this.name} ${this.surname}`;
				},
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
