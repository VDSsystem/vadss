import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  const { mongoClient } = await connectToDatabase();
  const db = mongoClient.db("test");
  const collection = db.collection("images");

  switch (req.method) {
    case "POST":
      try {
        const image = req.body.image;
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");

        const result = await collection.insertOne({ image: buffer });
        res.status(200).json({ id: result.insertedId });
      } catch (error) {
        res.status(500).json({ error: "Unable to upload image" });
      }
      break;
    case "GET":
      try {
        const images = await collection.find().toArray();
        const imageUrls = images.map((image) => {
          const imageUrl = `data:image/png;base64,${image.image.toString("base64")}`;
          return { id: image._id, imageUrl: imageUrl };
        });
        res.status(200).json(imageUrls);
      } catch (error) {
        res.status(500).json({ error: "Unable to retrieve images" });
      }
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
