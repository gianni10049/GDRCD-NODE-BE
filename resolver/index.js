const path = require('path');
const fs = require('fs');
const directoryPath = path.join(__dirname, './');

// Create Resolvers
let resolvers = async () => {
	let paths = await loadPaths();

	for (let path of paths) {
		let schema_data = require('./' + path);

		resolvers = {
			...resolvers,
			...(await getFilesFromPath(schema_data)),
		};
	}

	return resolvers;
};

// Load Dir Paths
const loadPaths = async () => {
	return fs.promises.readdir(directoryPath).then((files) => {
		let paths = [];

		for (let file of files) {
			if (file !== 'index.js') {
				paths.push(file);
			}
		}

		return paths;
	});
};

// Get All Files from a path
const getFilesFromPath = async (schema_data) => {
	let resolvers = [];

	for (let schema of Object.keys(schema_data)) {
		resolvers = {
			...resolvers,
			...schema_data[schema],
		};
	}

	return resolvers;
};

exports.resolvers = resolvers;
