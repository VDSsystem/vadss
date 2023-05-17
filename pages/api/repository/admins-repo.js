import { connectToDatabase } from "../../../lib/mongodb"

class AdminsRepo {
    async connect(){
        const { mongoClient } = await connectToDatabase()
        const db = mongoClient.db("test")
        const collection = db.collection("admins")
        return collection
    }
    async getAdmins() {
        const col = await this.connect()
        const admins = await col.find({}).toArray();
        return { status: 200, data: admins };
      }
      
    async sendUser(email, password) {
        const admin = await this.adminAuthentication(email, password);
        return admin

    }
    async adminAuthentication(email, password) {
        const resp = await this.getAdmins();
        const admins = resp.data;
        const admin = admins.find(u => u.email === email && u.password === password);
      
        if (admin) {
          return admin;
        } else {
          return null;
        }
      }
}

export default new AdminsRepo()