// simple frontend database

const DB_KEY = "land_pricing_db";

export function getDB() {
  const data = localStorage.getItem(DB_KEY);
  return data ? JSON.parse(data) : { pending: [], approved: [] };
}

export function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

// USER submits
export function addSubmission(entry) {
  const db = getDB();
  db.pending.push(entry);
  saveDB(db);
}

// MODERATOR approves
export function approveSubmission(index) {
  const db = getDB();
  const item = db.pending.splice(index, 1)[0];
  db.approved.push(item);
  saveDB(db);
}

// MODERATOR rejects
export function rejectSubmission(index) {
  const db = getDB();
  db.pending.splice(index, 1);
  saveDB(db);
}
