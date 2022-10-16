const { MarketController } = require('../controllers/Market');

const groups_character = {
	getMarketBuyList: async (tokenData,data ={}) => {
		data.tokenData = tokenData;
		return await MarketController.getMarketBuyList(data);
	},
	getMarketSellList: async (tokenData,data ={}) => {
		data.tokenData = tokenData;
		return await MarketController.getMarketSellList(data);
	}
};

const groups_characterMutation = {
	marketBuyItem: async (tokenData,data ={}) => {
		data.tokenData = tokenData;
		return await MarketController.marketBuyItem(data);
	},
	marketSellItem: async (tokenData,data ={}) => {
		data.tokenData = tokenData;
		return await MarketController.marketSellItem(data);
	},
};

exports.groups_character = groups_character;
exports.groups_characterMutation = groups_characterMutation;