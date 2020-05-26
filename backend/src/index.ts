import "source-map-support/register";
import { GraphQLServer } from 'graphql-yoga';
import gql from "graphql-tag";
import cors from "cors";

const typeDefs = gql`
  type Query {
    hello(name: String): String!
  }
`

const resolvers = {
  Query: {
    hello: (_: void, { name }: { name: string }) => `Hello ${name || 'World'}`,
  },
}

const server = new GraphQLServer({ typeDefs, resolvers });
server.express.use(cors());
server.start(() => console.log('Server is running on http://localhost:4000'));
