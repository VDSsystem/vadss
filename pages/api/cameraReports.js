import modelRepo from "./repository/model-repo";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
  const newImageString = { url: req.body.url, lat: req.body.lat, lng: req.body.lng, dateTime: req.body.dateTime };
  console.log(newImageString);
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
    const reports = await modelRepo.getReports();
    res.status(200).json(reports);
    break;
  
  
  }
}
