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
      
    async userCredintials(email, password) {
        const admin = await this.userAuthentication(email, password);
        return admin

    }
    async userAuthentication(email, password) {
        const col = await this.connect()
        const users = await col.find({}).toArray();
        const user = users.find(u => u.email === email && u.password === password);
      
        if (user) {
          return user;
        } else {
          return null;
        }
      }
}

export default new AdminsRepo()