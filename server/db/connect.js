import { MongoClient } from "mongodb";
import { mongoClient } from "../index.js";

export async function connectToCluster(uri) {
  let mongoClient;

  try {
    mongoClient = new MongoClient(uri);
    console.log("Connecting to MongoDB Atlas cluster...");
    await mongoClient.connect();
    console.log("Successfully connected to MongoDB Atlas!");

    return mongoClient;
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
}

export async function exultsChatCrudOperation() {
  try {
    const db = await mongoClient.db("portfolio");
    const collection = db.collection("chat");
    return collection;
  } catch (error) {
    console.log(error);
  } finally {
    await mongoClient.close();
  }
}

export async function exultsUserCrudOperation() {
  try {
    const db = await mongoClient.db("portfolio");
    const collection = db.collection("user");
    return collection;
  } catch (error) {
    console.log(error);
  } finally {
    await mongoClient.close();
  }
}
