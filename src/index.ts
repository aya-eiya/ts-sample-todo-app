import { queryType, stringArg, makeSchema } from "nexus";
import { ApolloServer } from "apollo-server";
import path from "path";
import * as Query from "./api";

import { TodoRepository } from "./domains";

const schema = makeSchema({
  types: Query,
  outputs: {
    schema: path.join(__dirname , "generated/schema.graphql"),
    typegen: path.join(__dirname , "generated/types.ts"),
  },
});

const server = new ApolloServer({
  schema,
});

const port = process.env.PORT || 4000;
server.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`));