import { connectToDatabase } from "../../../lib/mongodb"

class ReportsRepo {
    async connect(){
        const { mongoClient } = await connectToDatabase()
        const db = mongoClient.db("test")
        const collection = db.collection("vehicleReports")
        return collection
    }
    async getVehicleReports() {
        const col = await this.connect()
        const reports = await col.find({}).toArray();
        return { status: 200, data: reports };
      }
      async addVehicleReport(vehicleReport) {
        const col = await this.connect();
        // Get the vehicle reports and find the maximum ID
        const res = await this.getVehicleReports();
        const vehicleReports = res.data;
        let maxId = 0;
        if (vehicleReports.data.length > 0) {
          maxId = Math.max(...vehicleReports.data.map(report => report.id));
        }
        // Check if a report with the same espID already exists
        const foundReport = vehicleReports.find(report => report.espID == vehicleReport.espID);
        if (foundReport) {
          vehicleReport.id = foundReport.id;
          vehicleReport.letter = "-B";
        } else {
          const newId = maxId + 1;
          vehicleReport.id = newId;
          vehicleReport.letter = "-A";
        }
        const addedReport = await col.insertOne(vehicleReport);
        return addedReport;
      }
      
    async generateVehicleReports(dateTime, sev, imu, flex, flex2, flex3, flex4, smoke, temprature, location, description, espID){
      const vehicleReport = { dateTime, sev, imu, flex, flex2, flex3, flex4, smoke, temprature, location, description, espID};
      const addedReport = this.addVehicleReport(vehicleReport);
      return addedReport;

    }
}

export default new ReportsRepo()