import { USERS } from './leaderboard.js';

const TASKS = {
  clicks500:    { desc: "Mache 500 Klicks", target: 500, reward: 50 },
  invite3:      { desc: "Lade 3 Freunde ein", target: 3, reward: 40 },
  daily:        { desc: "Komme heute ins Spiel (täglicher Login)", reward: 10 }
};

// Hilfsfunktion für Tageswert in YYYY-MM-DD
function todayStr() {
  return new Date().toISOString().substring(0,10);
}

export default function handler(req, res) {
  const { tgId, action, value, referredBy } = req.body;
  if (!USERS[tgId]) USERS[tgId] = {
    lemons: 0,
    premium: 0,
    tasks: {},
    clicks: 0,
    invites: 0,
    lastLogin: null,
    upgrades: {},
    wallet: 0,
    shopItems: []
  };

  // Klick-Task (zählt Klicks z.B. individuell im Frontend mit window.clicks)
  if (action === "clicks500" && value >= TASKS.clicks500.target) {
    if (!USERS[tgId].tasks.clicks500) {
      USERS[tgId].premium += TASKS.clicks500.reward;
      USERS[tgId].tasks.clicks500 = true;
    }
  }

  // Invite-Task (Track Invite-Zahl & Belohne bei 3)
  if (action === "invite" && referredBy) {
    if (!USERS[referredBy]) USERS[referredBy] = { lemons:0, premium:0, tasks:{}, clicks:0, invites:0, lastLogin:null };
    USERS[referredBy].invites = (USERS[referredBy].invites || 0) + 1;
    if (
      USERS[referredBy].invites >= TASKS.invite3.target &&
      !USERS[referredBy].tasks.invite3
    ) {
      USERS[referredBy].premium += TASKS.invite3.reward;
      USERS[referredBy].tasks.invite3 = true;
    }
    // Auch Invite-Reward für den ersten Invite (wie vorher)
    if (!USERS[referredBy].tasks.invite) {
      USERS[referredBy].premium += 20;
      USERS[referredBy].tasks.invite = true;
    }
  }

  // Login-Task
  if (action === "daily") {
    const today = todayStr();
    if (USERS[tgId].lastLogin !== today) {
      USERS[tgId].lastLogin = today;
      if (!USERS[tgId].tasks["daily_"+today]) {
        USERS[tgId].premium += TASKS.daily.reward;
        USERS[tgId].tasks["daily_"+today] = true;
      }
    }
  }

  res.status(200).json({ ok: true, tasks: USERS[tgId].tasks });
}