import { makeSchema } from 'nexus';
import { ApolloServer } from 'apollo-server';
import path from 'path';
import * as Query from './api';

const schema = makeSchema({
  types: Query,
  outputs: {
    schema: path.join(__dirname , 'generated/todo-schema.graphql'),
    typegen: path.join(__dirname , 'generated/todo-types.ts'),
  },
});

const server = new ApolloServer({
  schema,
});

const port = process.env.PORT || 4000;
server.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`));