import { MongoClient } from 'mongodb'
import { global } from 'styled-jsx/css'
const { MONGODB_URI, MONGODB_DB } = process.env

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

let cashed = global.mongo 
if(!cashed){
  cashed = global.mongo = { conn: null, promise: null}
}
export async function connectToDatabase(){
  if(cashed.conn){
    return cashed.conn.db 
  }
  if(!cashed.promise){
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    
    cashed.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
      return {
        client,
        db: client.db(MONGODB_DB),
      };
    });
    
  }
  cashed.conn = await cashed.promise
  return cashed.conn.db 
}
