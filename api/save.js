// Vercel Serverless Function: Speichert Fortschritt für user
let USERS = {};

export default function handler(req, res) {
  if (req.method === "POST") {
    const { tgId, lemons, premium } = req.body;
    if (!tgId) return res.status(400).json({ error: "tgId missing" });
    USERS[tgId] = { lemons, premium };
    res.status(200).json({ ok: true });
  } else {
    res.status(405).json({ error: "only POST allowed" });
  }
}