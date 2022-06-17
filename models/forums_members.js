'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class ForumsMembers extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.ForumsMembers.belongsTo(models.Forums, {
				foreignKey: 'forum',
				as: 'forumData',
			});
			models.ForumsMembers.hasOne(models.Character, {
				foreignKey: 'id',
				name: 'character',
				as: 'characterData',
			});
		}
	}

	ForumsMembers.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			character: {
				type: Sequelize.INTEGER,
			},
			forum: {
				type: Sequelize.INTEGER,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'forums_members',
			modelName: 'ForumsMembers',
		}
	);
	return ForumsMembers;
};
