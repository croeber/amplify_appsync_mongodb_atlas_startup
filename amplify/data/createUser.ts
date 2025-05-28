import type { Schema } from "./resource";
import { connectToMongodb } from "./mdbUtils";
import { errorResponse, successResponse } from "./utils";


export const handler: Schema["createUser"]["functionHandler"] = async (
  event
) => {

  // Connect to MongoDB
  const client = connectToMongodb();
  try {
    console.log("Connected to MongoDB");
    const payload = {
        duz: event.arguments.duz,
        vista: event.arguments.duz,
        active: true,
    }
    const db = client.db("VIRR");
    const collection = db.collection("Users");
    const insertResult = await collection.insertOne(payload);
    const result = { _id: insertResult.insertedId.toString(), ...payload };

    return successResponse(result);
  } catch (e) {
    return errorResponse(e as Error);
  } finally {
    if (client) {
      await client.close();
    }
  }
};
