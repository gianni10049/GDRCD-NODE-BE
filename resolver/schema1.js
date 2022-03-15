const schema1 = {
	hello: () => {
		return 'Hello world!';
	},
};

const schema2 = {
	hello1: () => {
		return 'Hello world2!';
	},
	rollDice: async (data) => {
		let { numDice, numSides } = data;
		let launched = [];

		for (let i = 0; i < numDice; i++) {
			let val = Math.floor(Math.random() * numSides) + 1;

			launched.push(val);
		}
		return launched;
	},
};

exports.schema1 = schema1;
exports.schema2 = schema2;
