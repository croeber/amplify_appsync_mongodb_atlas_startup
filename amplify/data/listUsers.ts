import { connectToMongodb } from "./mdbUtils";

import type { Schema } from "./resource";
import { errorResponse, successResponse } from "./utils";

export const handler: Schema["listUsers"]["functionHandler"] = async () => {
  // Connect to MongoDB
  const client = connectToMongodb();

  try {
    console.log("Connected to MongoDB");
    const db = client.db("VIRR");
    const collection = db.collection("Users");
    const response = await collection.find();

    return successResponse(response);
    // return response.body;
  } catch (e) {
    console.log("got error: " + e);
    return errorResponse(e as Error);
  } finally {
    if (client) {
      await client.close();
    }
  }
};
