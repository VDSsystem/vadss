import ReportsHandler from "./repository/reportsHandler.js"

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
    <section class="reportCard">
    <table border="1">
        <tr>
          <th colspan="2">Accident Alert <span>!!! ID ${reports.id}</span></th>
        </tr>
        <tr>
          <td>Smoke</td>
          <td>${reports.smoke}</td>
        </tr>
        <tr>
          <td>Flex</td>
          <td>${reports.flex}</td>
        </tr>
        <tr>
            <td>Temprature</td>
            <td>${reports.temprature}</td>
        </tr>
        <tr>
            <td>IMU</td>
            <td>${reports.imu}</td>
        </tr>
        <tr>
            <td>Location</td>
            <td><a href="${reports.location}">${reports.location}</a></td>
        </tr>
        <tr>
            <td>Description</td>
            <td>DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD</td>
        </tr>
        
    </table>

</section>
    `;
}