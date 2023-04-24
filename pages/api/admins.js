import { connectToDatabase } from "../../lib/mongodb"

export default async function handler(req, res) {
    const { mongoClient } = await connectToDatabase()
    const db = mongoClient.db("test")
    const collection = db.collection("admins")
    switch (req.method) {
      case "POST":
        let newAdmin = JSON.parse(JSON.stringify(req.body));
        console.log(req.body)
        const addedAdmin = await collection.insertOne(newAdmin);
        res.json(addedAdmin);
        break;
      case "GET":
        const admins = await collection.find({}).toArray();
        res.json({ status: 200, data: admins });
        break;
    }
  }
  
