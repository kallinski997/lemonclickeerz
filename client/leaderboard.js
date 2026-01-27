const lbDiv = document.getElementById('leaderboard');

function loadLeaderboard() {
  fetch('/api/leaderboard')
    .then(r => r.json())
    .then(data => {
      lbDiv.innerHTML = `<h3>Leaderboard</h3>` +
        (data.length ? data.map(u =>
          `<div>${u.username || u.tgId}: <b>${u.lemons}</b> Zitronen</div>`
        ).join("") : "<div>Noch keine Spieler</div>");
    });
}
// Initial & alle 10s aktualisieren
loadLeaderboard();
setInterval(loadLeaderboard, 10000);