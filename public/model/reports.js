import ReportsHandler from "../controller/reportsHandler.js"

window.onload = async () => {
    await handleLoadReports()
    setInterval(handleLoadReports, 5000)
}
async function handleLoadReports() {
    const reportsArea = document.querySelector(".reportList")
    const reportsArea2 = document.querySelector(".cameraList")
    const reports = await ReportsHandler.getReports()
    const reports2 = await ReportsHandler.getCameraReports()
    console.log(reports2);
    if (reports.length === 0) {
        reportsArea.innerHTML = "There are no reports yet."
    } else {
        const reportsCards = reports.map((report) => repToCards(report)).join('')
        reportsArea.innerHTML = reportsCards
    }
    if (reports2.length === 0) {
        reportsArea2.innerHTML = "There are no reports yet."
    } else {
        const reportsCards2 = reports2.map((r) => camToCards(r)).join('')
        reportsArea2.innerHTML = reportsCards2
    }
        
}
function repToCards(reports) {
    return `
    <table border="1" class="reportCard">
        <tr>
          <th colspan="2">Accident Alert <span>!!! ID ${reports.id}${reports.letter}</span></th>
        </tr>
        <tr>
            <td class="small">Date and Time</td>
            <td>${reports.dateTime}</td>
        </tr>
        <tr>
            <td class="small" id="sev">Severity</td>
            <td class="Severity" id="sev2">${reports.sev}</td>
        </tr>
        <tr>
          <td class="small">Smoke</td>
          <td>${reports.smoke}</td>
        </tr>
        <tr>
          <td class="small">Front right flex</td>
          <td>${reports.flex}</td>
        </tr>
        <tr>
          <td class="small">Front left flex</td>
          <td>${reports.flex2}</td>
        </tr>
        <tr>
            <td class="small">Back right flex</td>
            <td>${reports.flex3}</td>
        </tr>
        <tr>
            <td class="small">Back left flex</td>
            <td>${reports.flex4}</td>
        </tr>
        <tr>
            <td class="small">Temprature</td>
            <td>${reports.temprature}</td>
        </tr>
        <tr>
            <td class="small">Flipping</td>
            <td>${reports.imu}</td>
        </tr>
        <tr>
            <td class="small">Location</td>
            <td><a href="${reports.location}" target="_blank">${reports.location}</a></td>
        </tr>
        <tr>
            <td class="small">Description</td>
            <td>${reports.description}</td>
        </tr>
        
    </table>
    `;
}
function camToCards(reports) {
    return `
    <div class="card">
    <div class="card-header">
    <h2 class="card-title">Accident Alert <span>!!! ID ${reports.id}</span></h2>
  </div>
  <p>${reports.dateTime}</p>
                <img src="${reports.url}" />
                <div class="card-location">
                <p>Location: <a href="https://www.google.com/maps/search/?api=1&query=${reports.lat},${reports.lng}" target="_blank">See location on map</a></p>
                </div>
            </div>
    `;
  }
  