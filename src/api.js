// const BASE_URL = "http://localhost:8000";

// export const submitData = async (data) => {
//   return fetch(`${BASE_URL}/submit`, {
//     method: "POST",
//     headers: {"Content-Type":"application/json"},
//     body: JSON.stringify(data)
//   }).then(res => res.json());
// };

// export const getData = async () => {
//   return fetch(`${BASE_URL}/submissions`)
//     .then(res => res.json());
// };


const BASE = "http://localhost:8000";

export const fetchMapData = () =>
  fetch(`${BASE}/submissions`).then(res => res.json());

export const submitLand = (data) =>
  fetch(`${BASE}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const fetchPending = () =>
  fetch(`${BASE}/pending`).then(res => res.json());

export const approve = (id) =>
  fetch(`${BASE}/approve/${id}`, { method: "POST" });

export const reject = (id) =>
  fetch(`${BASE}/reject/${id}`, { method: "POST" });