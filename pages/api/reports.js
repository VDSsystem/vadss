import reportsRepo from "./repository/reports-repo"

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const newReport = req.body;
      const response = await reportsRepo.addReport(newReport)
      if (!response) { 
        res.status(401).json({ success: false });
      } else {
        res.status(200).json({ success: true });
      }
      break;
    case "GET":
      const reports = await reportsRepo.getReports();
      res.status(200).json(reports);
      break;
  }
}
