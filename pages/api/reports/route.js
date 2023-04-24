import ReportsRepo from "./reports-repo"
const repo = new ReportsRepo()

export async function GET() {
    const reports = await repo.getReports()
    return Response.json(reports)
}
 
export async function POST(request) {
    const report = await request.json()
    await repo.addReport(report)
    return new Response('Successfully added the account')
}
  
