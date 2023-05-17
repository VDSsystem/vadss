import reportsRepo from "./repository/reports-repo"

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const { dateTime, sev, imu, flex, flex2, flex3, flex4, smoke, temprature, location, description, espID } = req.body;
      const response = await reportsRepo.generateVehicleReports(dateTime, sev, imu, flex, flex2, flex3, flex4, smoke, temprature, location, description, espID);
      if (!response) { 
        res.status(401).json({ success: false });
      } else {
        res.status(200).json({ success: true });
      }
      break;
    case "GET":
      const reports = await reportsRepo.getVehicleReports();
      res.status(200).json(reports);
      break;
  }
}
