const baseUrl = '/api/vehicleReports'
const baseUrl2 = '/api/cameraReports'

class ReportsHandler {
    async getReports() {
        const response = await fetch(baseUrl)
        const data = await response.json()
        console.log(data.data)
        return data.data
      }
      async getCameraReports(){
        const response = await fetch(baseUrl2)
        const data = await response.json()
        return data
      }
   
}

export default new ReportsHandler()