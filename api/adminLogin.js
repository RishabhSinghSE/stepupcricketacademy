export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const { email, password } = req.body;

  if (
    email === process.env.admin_email &&
    password === process.env.admin_pass
  ) {
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ success: false });
}
