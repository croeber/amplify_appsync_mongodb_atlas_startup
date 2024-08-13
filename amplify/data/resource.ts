import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

// Define the schema for the data
const schema = a.schema({
  Todo: a.customType({
    _id: a.id().required(),
    content: a.string().required(),
  }),

  // Define the addTodo mutation
  addTodo: a
    .mutation()
    .arguments({
      id: a.id(),
      content: a.string().required(),
    })
    .returns(a.ref("Todo"))
    .authorization(allow => [allow.authenticated()])
    .handler(
      a.handler.custom({
        dataSource: "MyMongoDBDataSource",
        entry: "./addTodo.js",
      })
    ),

  // Define the getTodo query
  getTodo: a
    .query()
    .arguments({ id: a.id().required() })
    .returns(a.ref("Todo"))
    .authorization(allow => [allow.authenticated()])
    .handler(
      a.handler.custom({
        dataSource: "MyMongoDBDataSource",
        entry: "./getTodo.js",
      })
    ),

  // Define the listTodo query
  listTodo: a
    .query()
    .returns(a.ref("Todo").array())
    .authorization(allow => [allow.authenticated()])
    .handler(
      a.handler.custom({
        dataSource: "MyMongoDBDataSource",
        entry: "./listTodo.js",
      })
    ),

  // Define the deleteTodo mutation
  deleteTodo: a
    .mutation()
    .arguments({
      id: a.string().required(),
    })
    .returns(a.string())
    .authorization(allow => [allow.authenticated()])
    .handler(
      a.handler.custom({
        dataSource: "MyMongoDBDataSource",
        entry: "./deleteTodo.js",
      })
    ),

  // Define the updateTodo mutation
  updateTodo: a
    .mutation()
    .arguments({
      _id: a.string().required(),
      content: a.string().required(),
    })
    .returns(a.string())
    .authorization(allow => [allow.authenticated()])
    .handler(
      a.handler.custom({
        dataSource: "MyMongoDBDataSource",
        entry: "./updateTodo.js",
      })
    ),
});

// This code defines the schema and data for the Amplify AppSync MongoDB Atlas startup

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});