import {MongoClient} from "mongodb";


// Environment variables
const ATLAS_CONNECTION_STRING = process.env.ATLAS_CONNECTION_STRING as string;

export function connectToMongodb(): MongoClient {
    return new MongoClient(ATLAS_CONNECTION_STRING);
}