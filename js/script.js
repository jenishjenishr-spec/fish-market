// Renders today's catch board on the main page, reading from the
// shared store (js/store.js) so admin edits show up here too.

function renderBoard(){
  const board = document.getElementById("catch-board");
  if (!board) return;

  const catchData = getCatch();

  if (!catchData.length){
    board.innerHTML = `<p class="board-empty">No fish listed yet — check back after the morning auction.</p>`;
    return;
  }

  board.innerHTML = catchData.map(fish => `
    <div class="fish-card">
      <svg width="30" height="28" viewBox="-4 -4 38 32">${iconFor(fish.sub)}</svg>
      <div class="fish-name">${fish.name}<small>${fish.sub || ""}</small></div>
      <div class="fish-meta">
        <div class="fish-price">₹${fish.price}<span>/kg</span></div>
        <span class="fish-tag">${fish.tag || "Fresh"}</span>
      </div>
    </div>
  `).join("");
}

function renderDate(){
  const el = document.getElementById("today-date");
  if (!el) return;
  const options = { weekday: "long", day: "numeric", month: "long" };
  el.textContent = new Date().toLocaleDateString("en-IN", options);
}

function renderYear(){
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  renderBoard();
  renderDate();
  renderYear();
});
