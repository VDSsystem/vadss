import { MongoClient } from 'mongodb'
import { global } from 'styled-jsx/css'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let cashed = global.mongo 
if(!cashed){
  cashed = global.mongo = { conn: null, promise: null}
}
export async function connectToDatabase(){
  if(cashed.conn){
    return cashed.conn
  }
  if(!cashed.promise){
    const opts ={
      userNewUrlParser: true,
      useUnifiedTopology: true,
    }
    cashed.promise = MongoClient.connect(MONGODB_URI, opts).then(client => {
      return {
        client,
        db: client.db(MONGODB_DB),
      }
    })
  }
  cashed.conn = await cashed.promise
  return cashed.conn
}