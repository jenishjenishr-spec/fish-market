function renderTable(){
  const body = document.getElementById("admin-table-body");
  const list = getCatch();

  if (!list.length){
    body.innerHTML = `<tr class="table-empty"><td colspan="5">No fish on the board yet. Add the first one above.</td></tr>`;
    return;
  }

  body.innerHTML = list.map(fish => `
    <tr>
      <td>${fish.name}</td>
      <td>${fish.sub || "—"}</td>
      <td class="price">₹${fish.price}</td>
      <td>${fish.tag || "Fresh"}</td>
      <td><button class="row-delete" data-id="${fish.id}">Remove</button></td>
    </tr>
  `).join("");

  body.querySelectorAll(".row-delete").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const updated = getCatch().filter(f => f.id !== id);
      saveCatch(updated);
      renderTable();
      showMsg("Removed from the board.");
    });
  });
}

function showMsg(text, isError){
  const el = document.getElementById("form-msg");
  el.textContent = text;
  el.classList.toggle("error", !!isError);
  if (!isError){
    setTimeout(() => { if (el.textContent === text) el.textContent = ""; }, 3000);
  }
}

document.getElementById("add-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("f-name").value.trim();
  const sub = document.getElementById("f-sub").value.trim();
  const price = Number(document.getElementById("f-price").value);
  const tag = document.getElementById("f-tag").value;

  if (!name || !price || price <= 0){
    showMsg("Enter a fish name and a valid price.", true);
    return;
  }

  const list = getCatch();
  const nextId = list.length ? Math.max(...list.map(f => f.id)) + 1 : 1;
  list.push({ id: nextId, name, sub, price, tag });
  saveCatch(list);

  document.getElementById("add-form").reset();
  renderTable();
  showMsg(`${name} added to today's board.`);
});

document.getElementById("reset-btn").addEventListener("click", () => {
  if (confirm("Reset the board to the default 6 fish? This clears everything you added.")){
    resetCatch();
    renderTable();
    showMsg("Board reset to default.");
  }
});

function renderYear(){
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  renderTable();
  renderYear();
});
