let express = require('express');
const db = require('./models');
let { importSchema } = require('graphql-import');
let { makeExecutableSchema } = require('@graphql-tools/schema');
let resolvers = require('./resolver/index');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const { loadSchemas } = require('./schema');

const GraphQlStart = async () => {
	// Create Schema from files
	const typeDefs = importSchema(await loadSchemas());
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
GraphQlStart().then(async (data) => {
	let app = express();
	app.use(cors());
	app.use(
		'/graphql',
		graphqlHTTP({
			schema: data.schema,
			rootValue: data.root,
			graphiql: true,
		})
	);

	db.sequelize.sync().then(() => {
		app.listen(4000);
		console.log(
			'DB started, GRAPHQL server runned on http://localhost:4000/graphql'
		);
	});
});
