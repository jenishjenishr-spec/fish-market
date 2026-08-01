// Shared catch data — reads/writes browser localStorage so the admin
// page and the main site stay in sync (same-browser only, no backend).

const STORAGE_KEY = "fishMarketCatch";

const defaultCatch = [
  { id: 1, name: "Vanjaram", sub: "Seer Fish", price: 850, tag: "Best Seller" },
  { id: 2, name: "Sankara", sub: "Red Snapper", price: 720, tag: "Fresh" },
  { id: 3, name: "Nandu", sub: "Sea Crab", price: 650, tag: "Limited" },
  { id: 4, name: "Kanava", sub: "Squid", price: 480, tag: "Fresh" },
  { id: 5, name: "Sura", sub: "Baby Shark", price: 380, tag: "Fresh" },
  { id: 6, name: "Ayla", sub: "Mackerel", price: 320, tag: "Everyday" }
];

// Icons keyed by a rough shape family — new admin entries default to "fish"
const iconShapes = {
  fish: `<path d="M2 12c5-6 12-8 18-6 3 1 6 3 8 6-2 3-5 5-8 6-6 2-13 0-18-6Z" fill="none" stroke="#EDEAE1" stroke-width="1.6"/><path d="M2 12 L-3 8 M2 12 L-3 16" stroke="#EDEAE1" stroke-width="1.6" transform="translate(4 0)"/><circle cx="21" cy="10" r="1.2" fill="#EDEAE1"/>`,
  crab: `<circle cx="14" cy="14" r="8" fill="none" stroke="#EDEAE1" stroke-width="1.6"/><path d="M6 10 L-1 6 M22 10 L29 6 M6 18 L-1 22 M22 18 L29 22" stroke="#EDEAE1" stroke-width="1.6"/>`,
  squid: `<path d="M14 4 C 20 4 22 12 18 18 L14 26 L10 18 C6 12 8 4 14 4 Z" fill="none" stroke="#EDEAE1" stroke-width="1.6"/>`
};

function iconFor(sub){
  const s = (sub || "").toLowerCase();
  if (s.includes("crab")) return iconShapes.crab;
  if (s.includes("squid")) return iconShapes.squid;
  return iconShapes.fish;
}

function getCatch(){
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultCatch.slice();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : defaultCatch.slice();
  } catch (e) {
    return defaultCatch.slice();
  }
}

function saveCatch(list){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function resetCatch(){
  localStorage.removeItem(STORAGE_KEY);
}
