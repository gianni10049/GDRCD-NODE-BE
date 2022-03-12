let { importSchema } = require('graphql-import');
let { makeExecutableSchema } = require('@graphql-tools/schema');
let { graphql } = require('graphql');
let resolvers = require('./resolver/index');

const GraphQlStart = async () => {
	// Create Schema from files
	const typeDefs = importSchema('schema/types.gql');
	const schema_resolvers = {};
	const schema = makeExecutableSchema({ typeDefs, schema_resolvers });

	// Import resolvers
	let rootValue = await resolvers.resolvers();

	// Return data for graphql to start
	return {
		schema,
		source: '{ hello1 }',
		rootValue,
	};
};

//Init Graphql
GraphQlStart().then((data) => {
	graphql(data).then((response) => {
		console.log(response);
	});
});
