import ReportsHandler from "../controller/reportsHandler.js"

window.onload = async () => {
    await handleLoadReports()
    setInterval(handleLoadReports, 5000)
}
async function handleLoadReports() {
    const reportsArea = document.querySelector(".reportList")
    const reports = await ReportsHandler.getReports()
    if (reports.length === 0) {
        reportsArea.innerHTML = "There are no reports yet."
    } else {
        const reportsCards = reports.map((report) => repToCards(report)).join('')
        reportsArea.innerHTML = reportsCards
    }
        
}
function repToCards(reports) {
    return `
    <table border="1" class="reportCard">
        <tr>
          <th colspan="2">Accident Alert <span>!!! ID ${reports.id}</span></th>
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
            <td><a href="${reports.location}">${reports.location}</a></td>
        </tr>
        <tr>
            <td class="small">Description</td>
            <td>${reports.description}</td>
        </tr>
        
    </table>
    `;
}