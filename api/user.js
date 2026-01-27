// Vercel Serverless Function: Holt oder erstellt einen User (einfach Demo, keine Datenbank)

// Userstruktur: lemons, premium, clicks, upgrades, wallet, shopItems
let USERS = {};

export default function handler(req, res) {
  if (req.method === "GET") {
    const { tgId } = req.query;
    if (!tgId) return res.status(400).json({ error: "tgId missing" });
    if (!USERS[tgId]) {
      USERS[tgId] = {
        lemons: 0,
        premium: 0,
        clicks: 0,
        upgrades: {},
        wallet: 0,
        shopItems: []
      };
    }
    res.status(200).json(USERS[tgId]);
  }
  if (req.method === "POST") {
    const { tgId, lemons, premium, clicks, upgrades, wallet, shopItems } = req.body;
    if (!tgId) return res.status(400).json({ error: "tgId missing" });
    if (!USERS[tgId]) USERS[tgId] = { lemons: 0, premium: 0, clicks: 0, upgrades: {}, wallet: 0, shopItems: [] };
    if (lemons !== undefined) USERS[tgId].lemons = lemons;
    if (premium !== undefined) USERS[tgId].premium = premium;
    if (clicks !== undefined) USERS[tgId].clicks = clicks;
    if (upgrades !== undefined) USERS[tgId].upgrades = upgrades;
    if (wallet !== undefined) USERS[tgId].wallet = wallet;
    if (shopItems !== undefined) USERS[tgId].shopItems = shopItems;
    res.status(200).json({ ok: true });
  }
}