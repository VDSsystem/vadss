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
        const foundReports = await collection.find({}).toArray();
        const foundReport = foundReports.find(r => r.espID === newReport.espID);
        const maxIdNum = parseInt(maxId);
        console.log(foundReport);
        if (foundReport) {
          newReport.id = maxIdNum + "-B";
        } else {
          newReport.id = maxIdNum + 1 + "-A";
        }
        const addedReport = await collection.insertOne(newReport);
        console.log(addedReport);
        
        
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
