let lemons = 0, premium = 0, clickValue = 1, totalClicks = 0, wallet = 0, upgrades = {}, shopItems = [];
let boostActive = false;
let boostMultiplier = 3;
let permaBoosts = window.permaBoosts || { dblClick: false, passive: 0, autoClick: 0, mult: 1, lucky: false, discount: false };
const lemonCountDiv = document.getElementById('lemon-count');
const premiumSpan = document.getElementById('premium');
const mainObj = document.getElementById('main-object');
const upgradeBtn = document.getElementById('upgrade-btn');

// Klickzähler-Anzeige hinzufügen
let clickCounter = document.createElement('div');
clickCounter.id = 'click-counter';
clickCounter.style.margin = '10px';
clickCounter.style.fontWeight = 'bold';
clickCounter.style.fontSize = '1.2em';
document.getElementById('game').insertBefore(clickCounter, lemonCountDiv);

function updateUI() {
  lemonCountDiv.textContent = `${Math.floor(lemons)} Zitronen`;
  premiumSpan.textContent = premium;
  clickCounter.textContent = `Klicks: ${totalClicks}`;
  // Coins & Booster anzeigen, falls vorhanden
  if (window.updateShopUI) window.updateShopUI();
}

function randomColor() {
  // HSL für bunte Farben
  return `hsl(${Math.floor(Math.random()*360)}, 90%, 85%)`;
}

mainObj.onclick = () => {
  // Boost und Upgrades berücksichtigen
  let mult = 1;
  if (boostActive) mult *= boostMultiplier;
  if (permaBoosts.dblClick) mult *= 2;
  if (permaBoosts.mult) mult *= permaBoosts.mult;
  // Lucky Coin: 1% Chance (wenn Upgrade aktiv)
  if (permaBoosts.lucky && Math.random() < 0.01) {
    wallet += 100;
    // Optional: Animation für Gold-Coin
  }
  lemons += clickValue * mult;
  totalClicks++;
  updateUI();
  // Animation
  mainObj.classList.add('active');
  let origBg = document.body.style.background;
  let color = randomColor();
  document.body.style.background = color;
  setTimeout(()=>{
    mainObj.classList.remove('active');
    document.body.style.background = origBg;
  }, 120);
  // Nach jedem Klick speichern (wenn Telegram-User vorhanden)
  if (window.tgUserId) saveProgress();
};
// Boost-Status von ads.js setzen können
window.setBoostActive = function(active, multiplier = 3) {
  boostActive = active;
  boostMultiplier = multiplier;
};

// Upgrades von upgrades.js synchronisieren
window.setPermaBoosts = function(boosts) {
  permaBoosts = boosts;
};

upgradeBtn.onclick = () => {
  if (lemons >= 50) {
    lemons -= 50;
    clickValue += 1;
    if (window.tgUserId) saveProgress();
    updateUI();
  }
};

// Fortschritt speichern
function saveProgress() {
  fetch('/api/save', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      tgId: window.tgUserId,
      lemons,
      premium,
      clicks: totalClicks,
      upgrades,
      wallet,
      shopItems
    })
  });
}

updateUI();