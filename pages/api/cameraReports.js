import modelRepo from "./repository/model-repo";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
  const newImageReport = { url: req.body.url, lat: req.body.lat, lng: req.body.lng, dateTime: req.body.dateTime };
  const response = await modelRepo.addReport(newImageReport)
  if (!response) {
    res.status(401).json({ success: false });
  } else {
    res.status(200).json({id: response.id});
  }
  break;
  case "GET":
    const reports = await modelRepo.getReports();
    res.status(200).json(reports);
    break;
  }
}
