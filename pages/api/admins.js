import { connectToDatabase } from "../../lib/mongodb"

export default async function handler(req, res) {
  const { mongoClient } = await connectToDatabase()
  const db = mongoClient.db("test")
  const collection = db.collection("admins")
  switch (req.method) {
    case "POST":
      const { email, password } = JSON.parse(JSON.stringify(req.body));
      console.log(email, password)
      //const addedAdmin = await collection.insertOne(newAdmin);
      const admin = await userAuthentication(email, password, collection);
      if (!admin) { // Check if admin is falsy
        console.log(`User ${email} is not authorized`);
        res.status(401).json({ success: false });
      } else {
        console.log(`User ${email} is authorized`);
        res.status(200).json({ success: true });
      }
      break;
    case "GET":
      const admins = await collection.find({}).toArray();
      res.status(200).json({ status: 200, data: admins });
      break;
  }
}

async function userAuthentication(email, password, collection) {
  const users = await collection.find({}).toArray();
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    return user;
  } else {
    return null;
  }
}

