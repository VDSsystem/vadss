import { connectToDatabase } from "../../lib/mongodb"
export default async function handler(req, res){
    const { mongoClient } = await connectToDatabase()
    const db = mongoClient.db("test")
    const collection = db.collection("admins")
    const data = await collection.find().toArray()
    res.json(data)
}
