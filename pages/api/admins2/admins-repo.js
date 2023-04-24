import fs from 'fs-extra'
import path from 'path'

export default class AdminsRepo {
    constructor(){
        this.path = path.join(process.cwd(), 'app/data/admins.json')
    }
    async getAdmins() {
        const accounts = await fs.readJson(this.path)
        return accounts 
    }
    async userAuthentication(email, password) {
        const users = await this.getAdmins();
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          return user;
        } else {
          return null;
        }
    } 
}