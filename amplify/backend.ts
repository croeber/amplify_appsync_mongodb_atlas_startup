import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

export const backend = defineBackend({
  auth,
  data,
});


backend.data.addHttpDataSource(
  "MyMongoDBDataSource",
  "https://data.mongodb-api.com"
);

backend.data.resources.cfnResources.cfnGraphqlApi.environmentVariables = {
  atlasdataapipath: process.env.ATLAS_DATA_API_PATH,
  dataapiheader: JSON.stringify({
    "Content-Type": "application/json",
    "Access-Control-Request-Headers": "*",
    "Accept": "application/json",
    "api-key": process.env.MONGODB_DATA_API_KEY
  }),
  clusterdetails: JSON.stringify({
    "collection": "Todos",
    "database": "Integration",
    "dataSource": "Cluster1",
  })
};