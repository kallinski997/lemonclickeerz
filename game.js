// game.js – Klick-Logik mit Boost und Wallet
console.log('game.js geladen');
let lemons = 0, premium = 0, clickValue = 1, totalClicks = 0, wallet = 0, upgrades = {}, shopItems = [];
let userBoosters = window.userBoosters || 0;
window.userCoins = window.userCoins || 0;
window.userBoosters = userBoosters;
let boostActive = false;
let boostMultiplier = 3;
window.permaBoosts = window.permaBoosts || { dblClick: false, passive: 0, autoClick: 0, mult: 1, lucky: false, discount: false };
let permaBoosts = window.permaBoosts;
const lemonCountDiv = document.getElementById('lemon-count');
const premiumSpan = document.getElementById('premium');
const mainObj = document.getElementById('main-object');
const upgradeBtn = document.getElementById('upgrade-btn');
console.log('mainObj:', mainObj, 'upgradeBtn:', upgradeBtn);

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
  window.userCoins = lemons;
  window.userBoosters = userBoosters;
  if (window.updateShopUI) window.updateShopUI();
  if (typeof updateUpgradesUI === 'function') updateUpgradesUI();
}

function randomColor() {
  return `hsl(${Math.floor(Math.random()*360)}, 90%, 85%)`;
}

mainObj.onclick = () => {
  console.log('Zitrone geklickt');
  let mult = 1;
  if (boostActive) mult *= boostMultiplier;
  if (permaBoosts.dblClick) mult *= 2;
  if (permaBoosts.mult) mult *= permaBoosts.mult;
  if (permaBoosts.lucky && Math.random() < 0.01) {
    wallet += 100;
  }
  lemons += clickValue * mult;
  totalClicks++;
  updateUI();
  mainObj.classList.add('active');
  let origBg = document.body.style.background;
  let color = randomColor();
  document.body.style.background = color;
  setTimeout(()=>{
    mainObj.classList.remove('active');
    document.body.style.background = origBg;
  }, 120);
  if (window.tgUserId) saveProgress();
};

upgradeBtn.onclick = () => {
  console.log('Upgrade-Button geklickt');
  if (lemons >= 50) {
    lemons -= 50;
    clickValue += 1;
    if (window.tgUserId) saveProgress();
    updateUI();
  }
};

window.setBoostActive = function(active, multiplier = 3) {
  boostActive = active;
  boostMultiplier = multiplier;
};
window.setPermaBoosts = function(boosts) {
  permaBoosts = boosts;
  window.permaBoosts = boosts;
  if (typeof updateUpgradesUI === 'function') updateUpgradesUI();
};

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
