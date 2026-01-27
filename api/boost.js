import { USERS } from './leaderboard.js';

function todayStr() {
  return new Date().toISOString().substring(0,10);
}

export default function handler(req, res) {
  const { tgId } = req.body;
  if (!tgId) return res.status(400).json({ error: "tgId missing" });
  if (!USERS[tgId]) USERS[tgId] = { lemons:0, premium:0, boostEndTs:0, boostUses:{} };

  const today = todayStr();
  USERS[tgId].boostUses = USERS[tgId].boostUses || {};
  USERS[tgId].boostUses[today] = USERS[tgId].boostUses[today] || 0;

  if (USERS[tgId].boostUses[today] >= 5) {
    // Limit erreicht
    return res.status(429).json({ error:"Max. 5 Boosts / 24h erreicht!" });
  }

  // Boost gewähren
  USERS[tgId].boostUses[today] += 1;
  USERS[tgId].boostEndTs = Date.now() + 5 * 60 * 1000;
  res.status(200).json({ ok: true, boostUntil: USERS[tgId].boostEndTs, boostCount: USERS[tgId].boostUses[today] });
}