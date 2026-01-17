export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: "Missing location" });
    }

    const message = `
📡 NEW ADMISSION GPS

📍 Latitude: ${latitude}
📍 Longitude: ${longitude}
🕒 Time: ${new Date().toLocaleString("en-IN")}

🌍 Map:
https://maps.google.com/?q=${latitude},${longitude}
`;

    const telegramUrl =
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text: message
      })
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Telegram API error:", text);
      return res.status(500).json({ error: "Telegram failed" });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("Backend crash:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
