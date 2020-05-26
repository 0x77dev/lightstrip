import "source-map-support/register";
import { GraphQLServer } from 'graphql-yoga';
import gql from "graphql-tag";
import cors from "cors";

const typeDefs = gql`
  type Query {
    alive: Boolean!
  }
`

const resolvers = {
  Query: {
    alive: () => true,
  },
}

const server = new GraphQLServer({ typeDefs, resolvers });
server.express.use(cors());
server.start({ subscriptions: '/' }, () => console.info('Backend is running on http://localhost:4000'));
