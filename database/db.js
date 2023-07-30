// db.js
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;
const dbName = "ghoomlo-db";

let db; // Declare db variable

async function connectToDatabase() {
  try {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    db = client.db(dbName); // Assign the db object here
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw error;
  }
}

function getDatabase() {
  if (!db) {
    throw new Error("Database connection has not been established.");
  }
  return db;
}

module.exports = { connectToDatabase, getDatabase };
