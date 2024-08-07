import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import * as dotenv from 'dotenv';

dotenv.config();

export const backend = defineBackend({
  auth,
  data,
});

backend.data.addHttpDataSource(
  "MyMongoDBDataSource",
  process.env.ATLAS_DATA_API_PATH || "https://data.mongodb-api.com"
);

const clusterdetails = JSON.stringify({
  collection: process.env.COLLECTION,
  database: process.env.DATABASE,
  dataSource: process.env.DATASOURCE,
});

backend.data.resources.cfnResources.cfnGraphqlApi.environmentVariables = {
  atlasdataapipath: process.env.ATLAS_DATA_API_PATH,
  dataapiheader: JSON.stringify({
    "Content-Type": "application/json",
    "Access-Control-Request-Headers": "*",
    "Accept": "application/json",
    "api-key": process.env.MONGODB_DATA_API_KEY
  }),
  clusterdetails: clusterdetails,
};

console.log(clusterdetails);