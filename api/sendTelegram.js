import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Missing location" });
  }

  const time = new Date().toLocaleString("en-IN");

  const message = `
📡 GPS LOCATION RECEIVED

📍 Latitude: ${latitude}
📍 Longitude: ${longitude}
🕒 Time: ${time}

🌍 Map:
https://maps.google.com/?q=${latitude},${longitude}
`;

  try {
    await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text: message
      })
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Telegram failed" });
  }
}
