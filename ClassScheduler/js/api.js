const API_URL = "https://6a0a801921e4456256960848.mockapi.io/schedules";

function getSchedules() {
  return fetch(API_URL).then(res => res.json());
}

function addSchedule(data) {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());
}

function deleteSchedule(id) {
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
}