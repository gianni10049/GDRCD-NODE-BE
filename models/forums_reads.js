'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class ForumsReads extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.ForumsReads.belongsTo(models.ForumsPosts, {
				foreignKey: 'post',
				as: 'postData',
			});
		}
	}

	ForumsReads.init(
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
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'forums_reads',
			modelName: 'ForumsReads',
		}
	);
	return ForumsReads;
};
