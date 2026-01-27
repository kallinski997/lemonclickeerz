const tgDiv = document.getElementById('telegram-user');
let tgUser = null;

if (window.Telegram && window.Telegram.WebApp) {
  window.Telegram.WebApp.expand();
  tgUser = window.Telegram.WebApp.initDataUnsafe.user;
  window.tgUserId = tgUser.id;
  tgDiv.textContent = `Hallo, ${tgUser?.username || 'Telegram-User'}!`;
  // Progress holen:
  fetch(`/api/user?tgId=${tgUser.id}`)
    .then(r=>r.json())
    .then(data => {
      if(data.lemons !== undefined) lemons = data.lemons;
      if(data.premium !== undefined) premium = data.premium;
      if(data.clicks !== undefined) totalClicks = data.clicks;
      if(data.upgrades !== undefined) upgrades = data.upgrades;
      if(data.wallet !== undefined) wallet = data.wallet;
      if(data.shopItems !== undefined) shopItems = data.shopItems;
      updateUI && updateUI();
    });
  // Spielstand speichern alle 5 Sekunden
  setInterval(() => {
    if (window.tgUserId) {
      fetch('/api/save', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          tgId: tgUser.id,
          lemons,
          premium,
          clicks: totalClicks,
          upgrades,
          wallet,
          shopItems
        })
      });
    }
  }, 5000);
} else {
  tgDiv.textContent = "Nicht über Telegram geöffnet!";
}