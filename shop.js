// Wallet-Button auf Hauptseite
const walletBtn = document.getElementById('wallet-btn');
if(walletBtn) {
  walletBtn.onclick = function() {
    window.connectTonWallet();
    walletBtn.innerText = 'Wallet verbunden: ' + TON_WALLET;
    walletBtn.disabled = true;
    walletBtn.style.background = '#b6e66b';
  };
}
// Neuer Shop mit TON Wallet Integration (Demo)
console.log('shop.js geladen');
const shopBtn = document.getElementById('shop-btn');
const shopPopup = document.getElementById('shop-popup');
console.log('shopBtn:', shopBtn, 'shopPopup:', shopPopup);

const TON_WALLET = "UQDOvy3sCXfbK2OKtFhuB3rZ_bdFX0T_bsS6Y_2W1nVnLyZn";
const SHOP_PACKAGES = [
  { name: "Mini",   price: 3000, boosters: 1 },
  { name: "Pro",    price: 10000, boosters: 2 },
  { name: "Mega",   price: 25000, boosters: 3 }
];

shopBtn.onclick = () => {
  console.log('Shop-Button geklickt');
  let html = `<h2>Shop: Booster kaufen</h2>`;
  html += `<button onclick=\"connectTonWallet()\">TON Wallet verbinden</button><br/><span id='wallet-status'></span>`;
  SHOP_PACKAGES.forEach(pkg => {
    html += `<div style="margin:15px;">
      <b>${pkg.name}</b>: 
      <button onclick="buyPackage(${pkg.price}, ${pkg.boosters})">
        ${pkg.boosters} Booster für ${pkg.price} Coins
      </button>
      <button onclick="payTon(${pkg.price}, '${pkg.name}')">Mit TON zahlen</button>
    </div>`;
  });
  html += `<button onclick=\"closeShop()\">Schließen</button>`;
  shopPopup.innerHTML = html;
  shopPopup.style.display = 'block';
};

window.connectTonWallet = function() {
  document.getElementById('wallet-status').innerText = 'Wallet verbunden: ' + TON_WALLET;
  window.tonWallet = TON_WALLET;
};

window.buyPackage = function(price, boosters) {
  if ((window.userCoins || 0) < price) {
    alert('Nicht genug Coins!');
    return;
  }
  window.userCoins -= price;
  window.userBoosters = (window.userBoosters || 0) + boosters;
  if (typeof userBoosters !== 'undefined') userBoosters = window.userBoosters;
  if (window.tgUserId) {
    fetch('/api/save', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        tgId: window.tgUserId,
        wallet: window.userCoins
      })
    });
  }
  updateShopUI();
  closeShop();
};

window.payTon = function(price, name) {
  if (!window.tonWallet) {
    alert('Bitte zuerst Wallet verbinden!');
    return;
  }
  alert(`Sende ${price} Coins für ${name} an Wallet: ${window.tonWallet}\n(Demo: Zahlung nicht wirklich durchgeführt)`);
  // Hier echte TON-Transaktion einbauen (z.B. mit tonconnect/sdk)
};

window.closeShop = function() { shopPopup.style.display = 'none'; };

const shopInfoDiv = document.createElement('div');
shopInfoDiv.id = 'shopinfo';
document.body.appendChild(shopInfoDiv);
function updateShopUI() {
  shopInfoDiv.innerHTML = 
    `🪙 Coins: <b>${window.userCoins || 0}</b> | 🔥 Booster: <b>${window.userBoosters || 0}</b>`;
}
window.updateShopUI = updateShopUI;
updateShopUI();

window.useBooster = function() {
  if ((window.userBoosters || 0) > 0) {
    window.userBoosters--;
    if (window.activateBoost) window.activateBoost();
    updateShopUI();
  }
};
