let { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
  
`);

// The rootValue provides a resolver function for each API endpoint
let rootValue = {
    hello: () => {
        return 'Hello world!';
    },
};

// Run the GraphQL query '{ hello }' and print out the response
graphql({
    schema,
    source: '{ hello }',
    rootValue
}).then((response) => {
    console.log(response);
});