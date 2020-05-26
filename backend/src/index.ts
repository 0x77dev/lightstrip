import "source-map-support/register";
import { GraphQLServer, PubSub } from 'graphql-yoga';
import gql from "graphql-tag";
import cors from "cors";
import LightStrip from "./LightStrip";
const pubsub = new PubSub();
const lightStrip = new LightStrip(240, (state: string) => pubsub.publish("state", state));
// import path from "path";
// import express from "express";

const typeDefs = gql`
  type Query {
    alive: Boolean!
    state: String!
  }

  type Mutation {
    startRainbow: Boolean!
    stopRainbow: Boolean!
    reset: Boolean!
  }

  type Subscription {
    state: String!
  }
`;

const resolvers = {
  Query: {
    alive: () => true,
    state: () => lightStrip.state
  },
  Mutation: {
    startRainbow: () => { lightStrip.startRainbow(); return true; },
    stopRainbow: () => { lightStrip.stopRainbow(); return true; },
    reset: () => { lightStrip.reset(); return true; }
  },
  Subscription: {
    state: (_: void, __: void, { pubsub }: { pubsub: PubSub }) => {
      pubsub.publish("state", lightStrip.state);
      return pubsub.asyncIterator("state");
    },
  }
}

const server = new GraphQLServer({ typeDefs, resolvers });
server.express.use(cors());
// server.express.use("/ui", express.static(path.join(__dirname, "..", "dist")));
server.start({ subscriptions: '/' }, () => console.info('Backend is running on http://localhost:4000'));
