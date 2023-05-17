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
      const col = await this.connect()
      let maxId = 0;
      const result = await col.aggregate([
        { $sort: { id: -1 } },
        { $limit: 1 }]).toArray();
        if (result.length > 0) {
            maxId = result[0].id;
        }//finding the maximumID 
        const foundReports = await col.find({}).toArray();//finding all reports
        const foundReport = foundReports.find(r => r.espID == vehicleReport.espID);
        if (foundReport) {//if the report with the same espID already exists
          vehicleReport.id = foundReport.id;
          vehicleReport.letter = "-B";//give it the name B
        } else {
          vehicleReport.id = maxId + 1;
          vehicleReport.letter = "-A";//give it the name A
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