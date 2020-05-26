import "source-map-support/register";
import { GraphQLServer } from 'graphql-yoga';
import gql from "graphql-tag";
import cors from "cors";
import LightStrip from "./LightStrip";
const lightStrip = new LightStrip(240);

// import path from "path";
// import express from "express";

const typeDefs = gql`
  type Query {
    alive: Boolean!
    state: String!
  }

  type Mutation {
    startRainbow: Boolean!
  }
`

const resolvers = {
  Query: {
    alive: () => true,
    state: () => lightStrip.state
  },
  Mutation: {
    startRainbow: () => { lightStrip.startRainbow(); return true; }
  }
}

const server = new GraphQLServer({ typeDefs, resolvers });
server.express.use(cors());
// server.express.use("/ui", express.static(path.join(__dirname, "..", "dist")));
server.start({ subscriptions: '/' }, () => console.info('Backend is running on http://localhost:4000'));
