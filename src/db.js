const KEY = "land_entries";

export function getEntries() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function saveEntries(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
  window.dispatchEvent(new Event("db_updated")); // 🔴 live refresh
}

// prevent spam same location same user
export function addEntry(entry) {
  const data = getEntries();

  const duplicate = data.find(e =>
    Math.abs(e.lat - entry.lat) < 0.0008 &&
    Math.abs(e.lng - entry.lng) < 0.0008 &&
    Math.abs(Date.now() - e.createdAt) < 60000
  );

  if (duplicate) {
    return { error: "Duplicate submission detected" };
  }

  data.push(entry);
  saveEntries(data);
  return { success: true };
}

export function updateStatus(id, status) {
  const data = getEntries().map(e =>
    e.id === id ? { ...e, status } : e
  );
  saveEntries(data);
}
