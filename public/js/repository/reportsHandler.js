const baseUrl = '/api/reports'

class ReportsHandler {
    async getReports() {
        const response = await fetch(baseUrl)
        return await response.json()
    }
    
}

export default new ReportsHandler()