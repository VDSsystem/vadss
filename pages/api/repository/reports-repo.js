import { connectToDatabase } from "../../../lib/mongodb"

class ReportsRepo {
    async connect(){
        const { mongoClient } = await connectToDatabase()
        const db = mongoClient.db("test")
        const collection = db.collection("vehicleReports")
        return collection
    }
    async getReports() {
        const col = await this.connect()
        const reports = await col.find({}).toArray();
        return { status: 200, data: reports };
      }
      
    async addReport(newReport) {
      const col = await this.connect()
      let maxId = 0;
      const result = await col.aggregate([
        { $sort: { id: -1 } },
        { $limit: 1 }]).toArray();
        if (result.length > 0) {
            maxId = result[0].id;
        }//finding the maximumID 
        const foundReports = await col.find({}).toArray();//finding all reports
        const foundReport = foundReports.find(r => r.espID == newReport.espID);
        if (foundReport) {//if the report with the same espID already exists
          newReport.id = foundReport.id;
          newReport.letter = "-B";//give it the name B
        } else {
          newReport.id = maxId + 1;
          newReport.letter = "-A";//give it the name A
        }
        const addedReport = await col.insertOne(newReport);
        return addedReport;
    }
}

export default new ReportsRepo()