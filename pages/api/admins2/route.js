import AdminsRepo from "./admins-repo"
const repo = new AdminsRepo()

export async function GET(request) {
    const admins = await repo.getAdmins()
  return Response.json(admins)
}
export async function POST(request) {
    const { email, password } = await request.json();
    console.log(`Received email: ${email}, password: ${password}`);
    const admin = await repo.userAuthentication(email,password);
    if (!admin) { // Check if admin is falsy
      console.log(`User ${email} is not authorized`);
      return new Response(JSON.stringify({ success: false }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      console.log(`User ${email} is authorized`);
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
}

