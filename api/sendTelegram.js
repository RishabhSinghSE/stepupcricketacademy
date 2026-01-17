export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      reg,
      name,
      age,
      parent,
      phone,
      address,
      timing,
      latitude,
      longitude,
      map,
      date
    } = req.body;

    // 🔐 Safety check
    if (!name || !phone) {
      return res.status(400).json({ error: "Incomplete data" });
    }

    const message = `
🏏 *NEW ADMISSION RECEIVED*
━━━━━━━━━━━━━━━━━━

🆔 Reg No: ${reg}

👤 Player Name: ${name}
📞 Phone: ${phone}
🎂 Age: ${age}
⏰ Timing: ${timing}
🏠 Address: ${address}
👨‍👩‍👦 Parent: ${parent}

📍 *GPS LOCATION*
Latitude: ${latitude}
Longitude: ${longitude}

🗺️ Map:
${map}

📅 Date:
${date}
━━━━━━━━━━━━━━━━━━
`;

    const telegramURL =
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

    const tgRes = await fetch(telegramURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text: message,
        parse_mode: "Markdown"
      })
    });

    if (!tgRes.ok) {
      const errText = await tgRes.text();
      console.error("Telegram Error:", errText);
      return res.status(500).json({ error: "Telegram failed" });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("Backend crash:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
