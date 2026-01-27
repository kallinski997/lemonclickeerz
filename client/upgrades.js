window.permaBoosts = window.permaBoosts || { dblClick: false, passive: 0, autoClick: 0, mult: 1, lucky: false, discount: false };

function updateUpgradesUI() {
  let html = `<h2>Permaboosts / permanente Upgrades</h2>`;
  html += `<div>
    <button onclick="buyDblClick()" ${window.permaBoosts.dblClick ? "disabled" : ""}>
      Doppelklick (x2) – 5.000 Coins ${window.permaBoosts.dblClick ? "✔️" : ""}
    </button>
  </div>`;
  html += `<div>
    <button onclick="buyPassive()" ${window.userCoins < 3_000 ? "disabled" : ""}>
      +1 passives Einkommen/Sekunde – 3.000 Coins (Aktuell: ${window.permaBoosts.passive || 0}/s)
    </button>
  </div>`;
  html += `<div>
    <button onclick="buyAutoClick()" ${window.userCoins < 8_000 ? "disabled" : ""}>
      +1 Auto-Klick/Sekunde – 8.000 Coins (Aktuell: ${window.permaBoosts.autoClick || 0}/s)
    </button>
  </div>`;
  html += `<div>
    <button onclick="buyMultiplier()" ${window.userCoins < 10_000 ? "disabled" : ""}>
      Ertrags-Multiplikator x2 – 10.000 Coins (Aktuell: x${window.permaBoosts.mult})
    </button>
  </div>`;
  html += `<div>
    <button onclick="buyLucky()" ${window.permaBoosts.lucky ? "disabled" : ""}>
      Lucky Coin (Chance auf Goldcoin bei Klick) – 15.000 Coins ${window.permaBoosts.lucky ? "✔️" : ""}
    </button>
  </div>`;
  html += `<div>
    <button onclick="buyDiscount()" ${window.permaBoosts.discount ? "disabled" : ""}>
      Rabatt auf alle Shop-Preise (10%) – 12.000 Coins ${window.permaBoosts.discount ? "✔️" : ""}
    </button>
  </div>`;
  upgradesDiv.innerHTML = html;
}

window.buyDblClick = function() {
  if (window.userCoins >= 5000 && !window.permaBoosts.dblClick) {
    window.userCoins -= 5000;
    window.permaBoosts.dblClick = true;
    updateShopUI();
    updateUpgradesUI();
    if (window.tgUserId) saveUpgrades();
  }
};
window.buyPassive = function() {
  if (window.userCoins >= 3000) {
    window.userCoins -= 3000;
    window.permaBoosts.passive = (window.permaBoosts.passive || 0) + 1;
    updateShopUI();
    updateUpgradesUI();
    if (window.tgUserId) saveUpgrades();
  }
};
window.buyAutoClick = function() {
  if (window.userCoins >= 8000) {
    window.userCoins -= 8000;
    window.permaBoosts.autoClick = (window.permaBoosts.autoClick || 0) + 1;
    updateShopUI();
    updateUpgradesUI();
    if (window.tgUserId) saveUpgrades();
  }
};
window.buyMultiplier = function() {
  if (window.userCoins >= 10000) {
    window.userCoins -= 10000;
    window.permaBoosts.mult *= 2;
    updateShopUI();
    updateUpgradesUI();
    if (window.tgUserId) saveUpgrades();
  }
};
window.buyLucky = function() {
  if (window.userCoins >= 15000 && !window.permaBoosts.lucky) {
    window.userCoins -= 15000;
    window.permaBoosts.lucky = true;
    updateShopUI();
    updateUpgradesUI();
    if (window.tgUserId) saveUpgrades();
  }
};
window.buyDiscount = function() {
  if (window.userCoins >= 12000 && !window.permaBoosts.discount) {
    window.userCoins -= 12000;
    window.permaBoosts.discount = true;
    updateShopUI();
    updateUpgradesUI();
    if (window.tgUserId) saveUpgrades();
  }
};
// Upgrades im Backend speichern
function saveUpgrades() {
  fetch('/api/save', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      tgId: window.tgUserId,
      upgrades: window.permaBoosts,
      wallet: window.userCoins
    })
  });
}

updateUpgradesUI();

const origClickHandler = window.mainObj.onclick;
window.mainObj.onclick = function() {
  let mult = boostActive ? boostMultiplier : 1;
  mult *= (window.permaBoosts.dblClick ? 2 : 1);
  mult *= window.permaBoosts.mult;
  // Lucky Coin: 1% Chance (wenn Upgrade aktiv)
  if (window.permaBoosts.lucky && Math.random() < 0.01) {
    window.userCoins += 100;
    // Option: Animation für Gold-Coin
  }
  lemons += clickValue * mult;
  updateUI();
  window.clicks += 1;
  window.mainObj.classList.add('active');
  setTimeout(() => window.mainObj.classList.remove('active'), 80);
};

// Automatische (passive) Coins
setInterval(() => {
  if (window.permaBoosts.passive) {
    lemons += window.permaBoosts.passive;
    updateUI();
  }
  if (window.permaBoosts.autoClick) {
    let autoMult = (boostActive ? boostMultiplier : 1)
                 * (window.permaBoosts.dblClick ? 2 : 1)
                 * window.permaBoosts.mult;
    lemons += window.permaBoosts.autoClick * clickValue * autoMult;
    updateUI();
  }
}, 1000);