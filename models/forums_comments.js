'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class ForumsComments extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.ForumsComments.belongsTo(models.ForumsPosts, {
				foreignKey: 'post',
				as: 'postData',
			});
		}
	}

	ForumsComments.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			character: {
				type: Sequelize.INTEGER,
			},
			post: {
				type: Sequelize.INTEGER,
			},
			text: {
				type: Sequelize.STRING,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'forums_comments',
			modelName: 'ForumsComments',
		}
	);
	return ForumsComments;
};
