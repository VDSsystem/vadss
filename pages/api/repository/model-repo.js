import { connectToDatabase } from "../../../lib/mongodb"

class ModelRepo {
    async connect(){
        const { mongoClient } = await connectToDatabase()
        const db = mongoClient.db("test")
        const collection = db.collection("cameraReports")
        return collection
    }
    async getCameraReports() {
        const col = await this.connect()
        const reports = await col.find({}).toArray();
        return { status: 200, data: reports };
      }
      
      async addCameraReport(cameraReport) {
        const col = await this.connect();
        const res = await this.generateCameraReport();
        const cameraReports = res.data;
        let maxId = 0;
        if (cameraReports.length > 0) {
          maxId = Math.max(...cameraReports.map(report => report.id));
        }
        const newId = maxId + 1;
        cameraReport.id = newId;
        const addedReport = await col.insertOne(cameraReport);
        return addedReport;
      }
      
    async generateCameraReport(lng, lat, url, dateTime){
      const cameraReport = { lng: lng, lat: lat, url: url, dateTime: dateTime};
      const addedReport = await this.addCameraReport(cameraReport);
      return addedReport;
    }
}

export default new ModelRepo()