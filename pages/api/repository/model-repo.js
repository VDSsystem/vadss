import { connectToDatabase } from "../../../lib/mongodb"

class ModelRepo {
    async connect(){
        const { mongoClient } = await connectToDatabase()
        const db = mongoClient.db("test")
        const collection = db.collection("cameraReports")
        return collection
    }
    async getReports() {
        const col = await this.connect()
        const reports = await col.find({}).toArray();
        return { status: 200, data: reports };
      }
      
    async addReport(newImageReport) {
        const col = await this.connect()
        let maxId = 0;
        const result = await col.aggregate([
          { $sort: { id: -1 } },
          { $limit: 1 }]).toArray();
        if (result.length > 0) {
          maxId = result[0].id;
        } //finding the maximumID 
        const newId = maxId + 1;
        newImageReport.id = newId;
        const addedImage = await col.insertOne(newImageReport);
        return addedImage;
    }
}

export default new ModelRepo()