// Leaderboard Serverless Function for Vercel
let USERS = {};

export default function handler(req, res) {
  // Die Spiel-Logik speichert Userdaten in USERS (Demo für Vercel: globales Memory)
  // Du kannst hier persistente Speicherung (Datenbank) nachrüsten!
  // Nur Top-10 zurückgeben:
  const leaderboard = Object.entries(USERS)
    .map(([tgId, u]) => ({
      tgId,
      lemons: u.lemons,
      premium: u.premium,
      username: u.username,
      clicks: u.clicks || 0,
      upgrades: u.upgrades || {},
      wallet: u.wallet || 0,
      shopItems: u.shopItems || []
    }))
    .sort((a, b) => b.lemons - a.lemons)
    .slice(0, 10);
  res.status(200).json(leaderboard);
}

// Damit die api/user.js/save.js auf die selben USERS zugreifen:
// Tipp: Extrahiere USERS in ein shared Modul oder nutze DB!
export { USERS };