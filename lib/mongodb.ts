import { MongoClient, MongoClientOptions } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}
const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;
let isConnected = false;

const connectWithRetry = async (retries = 3, delay = 1000): Promise<MongoClient> => {
  if (isConnected) return client;

  try {
    client = new MongoClient(uri, options)
    await client.connect()
    isConnected = true;
    return client;

  } catch (error) {
    if (retries === 0) throw new Error('Failed to connect to MongoDB after multiple retries');

    console.log(`Retrying to connect to MongoDB... Attempts remaining: ${retries}`);
    await new Promise(resolve => setTimeout(resolve, delay))
    return connectWithRetry(retries - 1, delay)
  }
}

if (IS_DEVELOPMENT) {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = connectWithRetry()
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  clientPromise = connectWithRetry()
}

const closeMongoClient = async () => {
  if (client && isConnected) {
    await client.close();
    isConnected = false;
  }
};

const gracefulShutdown = async () => {
  console.log('Shutting down server...');

  try {
    await closeMongoClient();
    console.log('MongoDB connection closed.');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }

  process.exit(0);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  gracefulShutdown();
});

export default clientPromise;

