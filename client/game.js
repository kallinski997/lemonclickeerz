let lemons = 0, premium = 0, clickValue = 1;
const lemonCountDiv = document.getElementById('lemon-count');
const premiumSpan = document.getElementById('premium');
const mainObj = document.getElementById('main-object');
const upgradeBtn = document.getElementById('upgrade-btn');

function updateUI() {
  lemonCountDiv.textContent = `${Math.floor(lemons)} Zitronen`;
  premiumSpan.textContent = premium;
}
mainObj.onclick = () => {
  lemons += clickValue; updateUI();
  mainObj.classList.add('active');
  setTimeout(()=>mainObj.classList.remove('active'), 80);
};
upgradeBtn.onclick = () => {
  if (lemons >= 50) {
    lemons -= 50;
    clickValue += 1;
    updateUI();
  }
};
// Premium kaufen und Userdaten werden von shop.js und telegram.js geregelt
updateUI();