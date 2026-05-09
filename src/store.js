const KEY = "land_prices_v1";

export function loadData() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function saveData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}
