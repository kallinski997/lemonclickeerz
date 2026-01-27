const shopBtn = document.getElementById('shop-btn');
const shopPopup = document.getElementById('shop-popup');

// Beispiel-Shoppakete
const SHOP_PACKAGES = [
  { name: "Mini",   stars: 100,   ton: 0.5,   coins: 3000,  boosters: 1 },
  { name: "Pro",    stars: 200,   ton: 1,     coins: 10000, boosters: 2 },
  { name: "Mega",   stars: 400,   ton: 2,     coins: 25000, boosters: 3 }
];

// Shop anzeigen
shopBtn.onclick = () => {
  let html = `<h2>Shop: Coins kaufen</h2>`;
  SHOP_PACKAGES.forEach(pkg => {
    html += `<div style="margin:15px;">
      <b>${pkg.name}</b>: 
      <button onclick="buyPackage('stars', ${pkg.stars}, ${pkg.coins}, ${pkg.boosters})">
        ${pkg.stars} Stars für ${pkg.coins} Coins & ${pkg.boosters} Booster
      </button>
      <button onclick="buyPackage('ton', ${pkg.ton}, ${pkg.coins}, ${pkg.boosters})">
        ${pkg.ton} TON für ${pkg.coins} Coins & ${pkg.boosters} Booster
      </button>
    </div>`;
  });
  html += `<button onclick="closeShop()">Schließen</button>`;
  shopPopup.innerHTML = html;
  shopPopup.style.display = 'block';
};

// Dummy-Kauf: Hier Integration mit Telegram Stars/TON Payments!
window.buyPackage = function(currency, amount, coins, boosters) {
  // Payment Integration TODO (Telegram Stars oder TON API)
  // Nach erfolgreichem Kauf:
  window.userCoins = (window.userCoins || 0) + coins;
  window.userBoosters = (window.userBoosters || 0) + boosters;
  updateShopUI();
  closeShop();
};

window.closeShop = function() { shopPopup.style.display = 'none'; };

// UI-Bereich für Coins & Booster
const shopInfoDiv = document.createElement('div');
shopInfoDiv.id = 'shopinfo';
document.body.appendChild(shopInfoDiv);
function updateShopUI() {
  shopInfoDiv.innerHTML = 
    `🪙 Coins: <b>${window.userCoins || 0}</b> | 🔥 Booster: <b>${window.userBoosters || 0}</b>`;
}
updateShopUI();

// Booster nutzen (Optional: Button oder Shop-Verbrauch)
window.useBooster = function() {
  if ((window.userBoosters || 0) > 0) {
    window.userBoosters--;
    activateBoost(); // nutzt ads.js-Boost (3x Klickwert)
    updateShopUI();
  }
};