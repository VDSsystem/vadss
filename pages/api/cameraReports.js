import modelRepo from "./repository/model-repo";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const { url, lat, lng, dateTime } = req.body;
      const response = await modelRepo.generateCameraReport(lng, lat, url, dateTime)
  if (!response) {
    res.status(401).json({ success: false });
  } else {
    res.status(200).json({success: true});
  }
  break;
  case "GET":
    const reports = await modelRepo.getCameraReports();
    res.status(200).json(reports);
    break;
  }
}
