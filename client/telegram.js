const tgDiv = document.getElementById('telegram-user');
let tgUser = null;

if (window.Telegram && window.Telegram.WebApp) {
  window.Telegram.WebApp.expand();
  tgUser = window.Telegram.WebApp.initDataUnsafe.user;
  tgDiv.textContent = `Hallo, ${tgUser?.username || 'Telegram-User'}!`;
  // Progress holen:
  fetch(`/api/user?tgId=${tgUser.id}`)
    .then(r=>r.json())
    .then(data => {
      if(data.lemons) lemons = data.lemons;
      if(data.premium) premium = data.premium;
      updateUI && updateUI();
    });
  // Spielstand speichern nach jedem Klick (Demo, besser: nach Änderung oder per Intervall)
  setInterval(() => {
    fetch('/api/save', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        tgId: tgUser.id,
        lemons,
        premium
      })
    });
  }, 5000);
} else {
  tgDiv.textContent = "Nicht über Telegram geöffnet!";
}