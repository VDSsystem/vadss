import { connectToDatabase } from "../../lib/mongodb"

export default async function handler(req, res) {
  const { mongoClient } = await connectToDatabase()
  const db = mongoClient.db("test")
  const collection = db.collection("output")
  switch (req.method) {
    case "POST":
  const { url, lat, lng } = req.body;
  let maxId = 0;
  const result = await collection.aggregate([
    { $sort: { id: -1 } },
    { $limit: 1 }]).toArray();
  if (result.length > 0) {
    maxId = result[0].id;
  } //finding the maximumID 
  const newId = maxId + 1;
  const newImageString = {
    id: newId,
    url: url,
    lat: lat,
    lng: lng
  };
  const addedImage = await collection.insertOne(newImageString);
  console.log(addedImage);
  if (!addedImage) {
    res.status(401).json({ success: false });
  } else {
    res.status(200).json({id: newId});
  }
  break;
  case "GET":
    const id = req.query.id;
    const image = await collection.findOne({ id: parseInt(id) });
    if (!image) {
      res.status(404).json({ message: "Image not found" });
    } else {
      const url = image.url;
      res.status(200).json({url });
    }
    break;
  
  }
}
