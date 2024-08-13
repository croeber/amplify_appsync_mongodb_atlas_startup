import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import * as dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Define the backend configuration using AWS Amplify
export const backend = defineBackend({
  auth,
  data,
});

// Add an HTTP data source for MongoDB Atlas using the Data API endpoint
backend.data.addHttpDataSource(
  "MyMongoDBDataSource",
  process.env.ATLAS_DATA_API_REGIONAL_ENDPOINT|| "https://data.mongodb-api.com" // Use the endpoint from environment variables or a default value
);

// Create a JSON string with cluster details from environment variables
const clusterdetails = JSON.stringify({
  collection: process.env.COLLECTION, // MongoDB collection name
  database: process.env.DATABASE, // MongoDB database name
  dataSource: process.env.DATASOURCE, // MongoDB data source name
});

// Set environment variables for the CloudFormation GraphQL API resource
backend.data.resources.cfnResources.cfnGraphqlApi.environmentVariables = {
  atlasdataapipath: process.env.ATLAS_DATA_API_PATH,
  dataapiheader: JSON.stringify({
    "Content-Type": "application/json",
    "Access-Control-Request-Headers": "*",
    "Accept": "application/json",
    "api-key": process.env.MONGODB_DATA_API_KEY // API key for MongoDB Data API
  }),
  clusterdetails: clusterdetails,
};

// Log the cluster details to the console for debugging purposes
console.log(clusterdetails);