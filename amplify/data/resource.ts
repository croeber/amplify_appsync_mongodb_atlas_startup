import {
  type ClientSchema,
  a,
  defineData,
  defineFunction,
} from "@aws-amplify/backend";

const envValues = {
  ATLAS_CONNECTION_STRING: process.env.ATLAS_CONNECTION_STRING!,
};

const createUserHandler = defineFunction({
  entry: "./createUser.ts",
  environment: {
    ...envValues,
  },
});


const listUsersHandlers = defineFunction({
  entry: "./listUsers.ts",
  environment: {
    ...envValues,
  },
});

const schema = a.schema({
  Permission: a.customType({
    _id: a.string().required(),
    code: a.integer().required(),
    name: a.string().required(),
    active: a.boolean().required(),
  }),
  User: a.customType({
    _id: a.string().required(),
    duz: a.string().required(),
    vista: a.string().required(),
    active: a.boolean().required(),
    permissions: a.ref("Permission").array(),
  }),
  CreateUserResponse: a.customType({
    statusCode: a.string(),
    body: a.ref("User"),
  }),
  createUser: a
    .mutation()
    .arguments({
      duz: a.string().required(),
      vista: a.string().required(),
      permissions: a.ref('Permission').array().required(),
    })
    .returns(a.ref("CreateUserResponse"))
    .authorization((allow) => [allow.publicApiKey()])
    .handler(a.handler.function(createUserHandler)),
    
  ListUsersResponse: a.customType({
    statusCode: a.string(),
    body: a.ref("User").array(),
  }),
  listUsers: a
    .query()
    .returns(a.ref("ListUsersResponse"))
    .authorization((allow) => [allow.publicApiKey()])
    .handler(a.handler.function(listUsersHandlers)),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
