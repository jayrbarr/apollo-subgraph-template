import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { gql } from 'graphql-tag';
import { readFileSync } from 'fs';

import resolvers from './graphql/resolvers.js';
import TokenUtilities from './utils/token-utilities.js';

const port = 4000; // TODO: change port number
const subgraphName = 'example1'; //TODO: change subgraph name

const typeDefs = gql(readFileSync('./graphql/schema.graphql', { encoding: 'utf-8' }));

const server = new ApolloServer({
    schema: buildSubgraphSchema({
        typeDefs,
        resolvers
    })
});

try {
    const { url } = await startStandaloneServer(server, {
        context: async ({ req }) => {
            // TODO: pull headers from request to be used in context (e.g., authorization)
            const token = req.headers.authorization || '';
            const user = TokenUtilities.extractUserInformation(token);
            return {
                user,
                dataSources: {
                    // TODO: add data sources here
                }
            }
        },
        listen: { port },
    });
    
    console.log(`🚀  Subgraph ${subgraphName} ready at: ${url}`);

} catch (error) {
    console.error(error);
}
