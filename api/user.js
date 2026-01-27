// Vercel Serverless Function: Holt oder erstellt einen User (einfach Demo, keine Datenbank)
let USERS = {};

export default function handler(req, res) {
  if (req.method === "GET") {
    const { tgId } = req.query;
    if (!USERS[tgId]) USERS[tgId] = { lemons: 0, premium: 0 };
    res.status(200).json(USERS[tgId]);
  }
  if (req.method === "POST") {
    const { tgId, lemons, premium } = req.body;
    if (!tgId) return res.status(400).json({ error: "tgId missing" });
    USERS[tgId] = { lemons, premium };
    res.status(200).json({ ok: true });
  }
}