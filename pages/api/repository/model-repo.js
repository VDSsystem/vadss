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
        const col = await this.connect()
        let maxId = 0;
        const result = await col.aggregate([
          { $sort: { id: -1 } },
          { $limit: 1 }]).toArray();
        if (result.length > 0) {
          maxId = result[0].id;
        } //finding the maximumID 
        const newId = maxId + 1;
        cameraReport.id = newId;
        const addedReport = await col.insertOne(cameraReport);
        return addedReport;
    }
    async generateCameraReport(lng, lat, url, dateTime){
      const cameraReport = { lng: lng, lat: lat, url: url, dateTime: dateTime};
      const addedReport = this.addCameraReport(cameraReport);
      return addedReport;
    }
}

export default new ModelRepo()