import adminsRepo from "./repository/admins-repo"

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const { email, password } = JSON.parse(JSON.stringify(req.body));
      const response = await adminsRepo.sendUser(email, password); 
      if (!response) { // Check if admin is falsy
        console.log(`User ${email} is not authorized`);
        res.status(401).json({ success: false });
      } else {
        console.log(`User ${email} is authorized`);
        res.status(200).json({ success: true });
      }
      break;
    case "GET":
      const admins = await adminsRepo.getAdmins()
      res.status(200).json(admins);
      break;
  }
}



