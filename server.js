let express = require('express');
let { importSchema } = require('graphql-import');
let { makeExecutableSchema } = require('@graphql-tools/schema');
let resolvers = require('./resolver/index');
const { graphqlHTTP } = require('express-graphql');

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
		root: rootValue,
	};
};

//Init Graphql
GraphQlStart().then((data) => {
	let app = express();

	app.use(
		'/graphql',
		graphqlHTTP({
			schema: data.schema,
			rootValue: data.root,
			graphiql: true,
		})
	);
	app.listen(4000);
	console.log('server run on http://localhost:4000/graphql');
});
