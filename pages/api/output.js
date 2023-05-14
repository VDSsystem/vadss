import { connectToDatabase } from "../../lib/mongodb"

export default async function handler(req, res) {
  const { mongoClient } = await connectToDatabase()
  const db = mongoClient.db("test")
  const collection = db.collection("output")
  switch (req.method) {
    case "POST":
  const newImageString = { url: req.body.url, lat: req.body.lat, lng: req.body.lng };
  let maxId = 0;
  const result = await collection.aggregate([
    { $sort: { id: -1 } },
    { $limit: 1 }]).toArray();
  if (result.length > 0) {
    maxId = result[0].id;
  } //finding the maximumID 
  const newId = maxId + 1;
  newImageString.id = newId;
  const addedImage = await collection.insertOne(newImageString);
  console.log(addedImage);
  if (!addedImage) {
    res.status(401).json({ success: false });
  } else {
    res.status(200).json({id: newId});
  }
  break;


  case "GET":
  const images = await collection.find().toArray();
  if (!images || images.length === 0) {
    res.status(404).json({ message: "No images found" });
  } else {
    res.status(200).json({ data: images });
  }
  break;
}

}
