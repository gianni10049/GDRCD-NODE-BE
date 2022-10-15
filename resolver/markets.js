const { MarketController } = require('../controllers/Market');

const groups_character = {
	getMarketBuyList: async (tokenData,data ={}) => {
		data.tokenData = tokenData;
		return await MarketController.getMarketBuyList(data);
	}
};

exports.groups_character = groups_character;
