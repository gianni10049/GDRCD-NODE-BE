let {
	Objects,
	ObjectsList,
} = require('./../models');
const { Op } = require('sequelize');

class ObjectsController {

	/**
	 * @note Object exist in objects table
	 * @param id
	 * @returns {Promise<*>}
	 */
	static async objectExist(id) {
		return await Objects.count({
			where: {
				id: id,
				deletedAt: {
					[Op.is]: null,
				},
				visible: true,
			},
		});
	}

	/**
	 * @note Object data from objects table
	 * @param data = {id, tokenData}
	 * @returns {Promise<*>}
	 */
	static async getObjectQuery(data) {
		let { id } = data;

		return await Objects.findOne({
			where: { id: id },
			deletedAt: {
				[Op.is]: null,
			},
		});
	}

	/**
	 * @note Object exist in objects_list table
	 * @param id
	 * @returns {Promise<*>}
	 */
	static async objectListExist(id) {
		return Objects.count({
			where: {
				id: id,
				deletedAt: {
					[Op.is]: null,
				},
				visible: true,
			},
		});
	}

	/**
	 * @note Object data from objects_list table
	 * @param data = {id, tokenData}
	 * @returns {Promise<*>}
	 */
	static async getObjectListQuery(data) {
		let { id } = data;

		return await ObjectsList.findOne({
			where: {
				id: id,
				deletedAt: {
					[Op.is]: null,
				},
			},
		});
	}

	static async getObjectData(data) {
		let { id } = data;

		if (!await this.objectExist(id)) {
			return false;
		}

		return await this.getObjectQuery(id);
	}

	static async getObjectListData(data) {
		let { id } = data;

		if (!await this.objectExist(id)) {
			return false;
		}

		return await this.getObjectQuery(id);
	}
}

exports.ObjectsController = ObjectsController;
