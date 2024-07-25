
// This function returns the connection details for the MongoDB database
export function getConnectionDetails() {
    return {
        "collection": "Todos",
        "database": "Integration",
        "dataSource": "Cluster1"
    };
}

// This function returns the headers required for making requests to the MongoDB Data API
export function getDataAPIHeaders(ctx) {
  return {
    "Content-Type": "application/json", // Set the content type to JSON
    "Access-Control-Request-Headers": "*", // Allow all headers in requests
    "Accept": "application/json", // Expected response format is JSON
    "api-key": ctx.env.mongodbsecret // Use the MongoDB API key from environment variables
  };
}

// This function retrieves the filter object for MongoDB queries
// based on the user's username from the request context
export function getUserFilter(ctx) {
    return {
        "username": ctx.identity.username,
    };
}

// This function generates a filter object for MongoDB queries
// to retrieve a specific user document based on the provided
// _id and the username from the request context
export function getUserDocumentFilter(ctx) {
    return {
        "_id": {"$oid": ctx.arguments._id},
        "username": ctx.identity.username,
    };
}