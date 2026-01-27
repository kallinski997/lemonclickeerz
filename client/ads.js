let boostActive = false;
let boostEndTimestamp = 0;
let boostMultiplier = 3;
const boostDurationMs = 5 * 60 * 1000; // 5 Minuten

const adsDiv = document.createElement('div');
adsDiv.innerHTML = `<button id="ad-btn">Werbung schauen für 5-min 3x Klick-Boost</button>
  <span id="boost-timer"></span>
  <div id="ad-popup" style="display:none;position:fixed;top:20%;left:50%;transform:translateX(-50%);width:300px;height:180px;background:#fff;border:2px solid #666;padding:30px;border-radius:10px;z-index:999;text-align:center;"></div>
  <div id="boost-info"></div>`;
document.body.appendChild(adsDiv);

const tgUserId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;

document.getElementById('ad-btn').onclick = function() {
  // Vor dem Video: Prüfe im Backend, ob noch Boosts übrig sind
  fetch('/api/boost', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tgId: tgUserId })
  })
  .then(r => r.json())
  .then(data => {
    if (!data.ok) {
      document.getElementById('boost-info').textContent = "Limit erreicht: Maximal 5 Boosts pro Tag!";
      return;
    }
    showAd();
  })
  .catch(() => {
    document.getElementById('boost-info').textContent = "Boost nicht verfügbar.";
  });
};

function showAd() {
  const adPopup = document.getElementById('ad-popup');
  adPopup.innerHTML = "<h3>Werbevideo läuft...<br/>Bitte warten</h3><div id='ad-countdown'>5</div>";
  adPopup.style.display = 'block';
  let sec = 5;
  let adTimer = setInterval(() => {
    sec--;
    document.getElementById('ad-countdown').textContent = sec;
    if (sec <= 0) {
      clearInterval(adTimer);
      adPopup.style.display = 'none';
      activateBoost();
    }
  }, 1000);
}

function activateBoost() {
  boostActive = true;
  boostEndTimestamp = Date.now() + boostDurationMs;
  updateBoostTimer();
}


// Boost-Status an game.js melden
function activateBoost() {
  boostActive = true;
  boostEndTimestamp = Date.now() + boostDurationMs;
  if (window.setBoostActive) window.setBoostActive(true, boostMultiplier);
  updateBoostTimer();
}

function updateBoostTimer() {
  const timerSpan = document.getElementById('boost-timer');
  if (!boostActive) {
    timerSpan.textContent = '';
    return;
  }
  let interval = setInterval(() => {
    let left = boostEndTimestamp - Date.now();
    if (left > 0) {
      let min = Math.floor(left / 60000);
      let sec = Math.floor((left % 60000)/1000);
      timerSpan.textContent = `⬆ Boost aktiv: ${min}:${sec.toString().padStart(2, '0')} min`;
    } else {
      boostActive = false;
      if (window.setBoostActive) window.setBoostActive(false);
      timerSpan.textContent = "";
      clearInterval(interval);
    }
  }, 1000);
  timerSpan.textContent = "⬆ Boost aktiv!";
}

if (boostActive) updateBoostTimer();