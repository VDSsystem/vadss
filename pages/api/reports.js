import { connectToDatabase } from "../../lib/mongodb"

export default async function handler(req, res) {
  const { mongoClient } = await connectToDatabase()
  const db = mongoClient.db("test")
  const collection = db.collection("reports")
  switch (req.method) {
    case "POST":
      const newReport = req.body;
      let maxId = 0;
      const result = await collection.aggregate([
        { $sort: { id: -1 } },
        { $limit: 1 }]).toArray();
        if (result.length > 0) {
            maxId = result[0].id;
        }
        newReport.id = maxId + 1;
        const addedReport = await collection.insertOne(newReport);
      console.log(addedReport)
      if (!newReport) { 
        res.status(401).json({ success: false });
      } else {
        res.status(200).json({ success: true });
      }
      break;
    case "GET":
      const reports = await collection.find({}).toArray();
      res.status(200).json({ status: 200, data: reports });
      break;
  }
}
