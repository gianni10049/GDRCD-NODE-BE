'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	class Forums extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.Forums.hasMany(models.ForumsPosts, {
				foreignKey: 'forum',
				name: 'id',
				allowNull: true,
				as: 'postsData',
			});
		}
	}

	Forums.init(
		{
			id: {
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			name: {
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.STRING,
			},
			logo: {
				type: Sequelize.STRING,
			},
			type: {
				type: Sequelize.STRING,
			},
			owner: {
				type: Sequelize.INTEGER,
			},
			visible: {
				type: Sequelize.INTEGER,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			deletedAt: Sequelize.DATE,
		},
		{
			sequelize,
			tableName: 'forums',
			modelName: 'Forums',
		}
	);
	return Forums;
};
