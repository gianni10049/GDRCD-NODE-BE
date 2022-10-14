'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class ForumsCategories extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.ForumsCategories.hasMany(models.Forums, {
				foreignKey: 'category',
				name: 'id',
				allowNull: false,
				as: 'forumData',
			});
		}
	}

	ForumsCategories.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			title: {
				type: Sequelize.STRING,
			},
			order: {
				type: Sequelize.INTEGER,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'forums_categories',
			modelName: 'ForumsCategories',
		}
	);
	return ForumsCategories;
};
