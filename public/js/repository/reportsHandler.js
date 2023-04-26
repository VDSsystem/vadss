const baseUrl = '/api/reports'

class ReportsHandler {
    async getReports() {
        const response = await fetch(baseUrl)
        const data = await response.json()
        console.log(data.data)
        return data.data
      }
   
}

export default new ReportsHandler()