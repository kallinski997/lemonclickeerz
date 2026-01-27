const tasksDiv = document.getElementById('tasks');
const tgUserId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
const tgUsername = window.Telegram?.WebApp?.initDataUnsafe?.user?.username;

// Klickzähler
window.clicks = window.clicks || 0;
if (window.mainObj) {
  window.mainObj.addEventListener('click', () => {
    window.clicks += 1;
  });
}

// Daily Login
function dailyLogin() {
  fetch("/api/tasks", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tgId: tgUserId, action: "daily" })
  });
}

// Invite Erkennung: Referral-Link im Telegram-Start-Parameter auswerten (bei Bot starten mit /start=inviteId)
function checkReferral() {
  const params = new URLSearchParams(window.location.search);
  const refBy = params.get('ref');
  if (refBy && tgUserId && refBy !== tgUserId) {
    fetch("/api/tasks", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tgId: tgUserId, action: "invite", referredBy: refBy })
    });
  }
}

// Task UI und Status
const tasksList = [
  { key: "clicks500", desc: "Mache 500 Klicks", type: "klick", target: 500, reward: 50 },
  { key: "invite3", desc: "Lade 3 Freunde ein", type: "invite", target: 3, reward: 40 },
  { key: "daily", desc: "Täglicher Login", type: "login", target: 1, reward: 10 }
];

function checkTasks() {
  // Klick-Meilenstein prüfen
  fetch("/api/tasks", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tgId: tgUserId, action: "clicks500", value: window.clicks || 0 })
  }).then(r => r.json()).then(data => {
    let done = data.tasks || {};
    let html = "<h3>Tasks / Meilensteine</h3>";

    tasksList.forEach(t => {
      // Für daily Task „daily_YYYY-MM-DD“ prüfen
      let val = done[t.key];
      if (t.key === "daily") {
        const today = new Date().toISOString().substring(0,10);
        val = done["daily_"+today];
      }
      html += `<div>
        ${t.desc}: 
        <span>${val ? "✔️" : "❌"}</span> 
        <small>${t.reward} 💎</small>
      </div>`;
    });

    // Referral Einladungs-Link anzeigen
    if (tgUserId) {
      const refLink = `https://t.me/YOUR_BOTNAME?start=${tgUserId}`;
      html += `<div><b>Dein Einladungslink:</b> <br/>
      <input value="${refLink}" readonly style="width:90%"></div>`;
    }

    tasksDiv.innerHTML = html;
  });
}

dailyLogin();
checkReferral();
setInterval(checkTasks, 5000);
checkTasks();