import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import typeDefs from './schemaGql.js';
import resolvers from './resolver.js';



dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error(" MongoDB error:", err.message);
    process.exit(1);
  });

const PORT = process.env.PORT;

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
});

console.log(`Server ready at ${url}`);
