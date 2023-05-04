const baseUrl = '/api/admins'

class AdminsToServer {
    async sendAdmin(email, password) {
        const response = await fetch(baseUrl, {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        return data;
      }
}

export default new AdminsToServer()