import ReportsHandler from "./repository/reportsHandler.js"

window.onload = async () => {
    await handleLoadReports()
   console.log("Loaded")

}
async function handleLoadReports() {
    const reportsArea = document.querySelector(".reportList")
    const reports = await ReportsHandler.getReports()
    const reportsCards = reports.map((reports) => repToCards(reports)).join('');
    reportsArea.innerHTML = reportsCards;       
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
            <td>${reports.location}</td>
        </tr>
        <tr>
            <td>Description</td>
            <td>DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD</td>
        </tr>
        
    </table>

</section>
    `;
}