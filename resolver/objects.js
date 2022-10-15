const { ObjectsController } = require('../controllers/Objects');

const groups_character = {
	getObjectData: async (tokenData,data ={}) => {
		data.tokenData = tokenData;
		return await ObjectsController.getObjectData(data);
	},
	getObjectListData: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await ObjectsController.getObjectListData(data);
	},
};

exports.groups_character = groups_character;
