module.exports = (sequelize, Sequelize) => {
	return sequelize.define('rolled_dices', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		rolled: {
			type: Sequelize.STRING,
		},
	});
};
