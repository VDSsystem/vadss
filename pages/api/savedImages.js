import { connectToDatabase } from "../../lib/mongodb"
import multer from "multer";
import express from "express";
import path from "path";


const storage = multer.diskStorage({
    destination: "public/images/",
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }

})
const upload = multer({ storage: storage }); 
export const config = {
  api: {
    bodyParser: false 
  }
};

const app = express();

// Serve the images in the public directory
app.use(express.static(path.join(__dirname, 'public')));

export default async function handler(req, res) {
  const { mongoClient } = await connectToDatabase()
  const db = mongoClient.db("test")
  const collection = db.collection("images")

  switch (req.method) {
    case "POST":
        let maxId = 0;
        const result = await collection.aggregate([{ $sort: { id: -1 } }, { $limit: 1 }]).toArray();
        if (result.length > 0) {
         maxId = result[0].id || 0;
        }
        const imageID = maxId + 1;

      upload.single("image")(req, res, async function(err) { // Use multer to handle the file upload
        if (err) {
          console.error("Error uploading file", err);
          res.status(500).json({ success: false });
        } else {
          const newImage = {
            id: imageID,
            name: req.file.originalname,
            path: `/images/${req.file.filename}` // Use the relative path to the image
          };
          const addedImage = await collection.insertOne(newImage);
          console.log(addedImage);
          res.status(200).json({ success: true });
        }
      });
      break;
      case "GET":
      const images = await collection.find({}).toArray();
      res.status(200).json({ status: 200, data: images });
      break;
    }
}
