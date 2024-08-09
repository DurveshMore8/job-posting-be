import { MongoClient, ServerApiVersion } from "mongodb";

let client: MongoClient;

const connectMongo = async () => {
  const uri: string =
    process.env.MONGO_URI ||
    "mongodb+srv://job_posting:job_posting@cluster0.npsky.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log(e);
  }
};

export { client, connectMongo };
