import { MongoClient } from 'mongodb'
const { MONGODB_URI } = process.env
let mongoClient;

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}
export async function connectToDatabase(){
  try{
    if(mongoClient){
      return { mongoClient }
    }
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    mongoClient = await (new
      MongoClient(MONGODB_URI, opts)).connect()
      console.log("Connected to MongoDB");
      return { mongoClient}
  }
  catch(e){
    console.error(e)
  }
}
