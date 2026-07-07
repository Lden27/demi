if(localStorage.getItem("isLogin") !== "true"){
    window.location.href = "login.html";
}
function logout(){

    localStorage.removeItem("isLogin");

    window.location.href = "login.html";
}
let tb = document.getElementById("tb");

let schedules = [];

async function load() {
  schedules = await getSchedules();
  render(schedules);
}

function render(data) {
  tb.innerHTML = "";

  data.forEach(item => {
    tb.innerHTML += `
      <tr>
        <td>${item.subject}</td>
        <td>${item.date}</td>
        <td>${item.time}</td>
        <td>${item.room}</td>
        <td>
          <button onclick="removeItem('${item.id}')" class="btn btn-danger btn-sm">X</button>
        </td>
      </tr>
    `;
  });
}

$("#form").on("submit", async function(e) {
  e.preventDefault();

  const data = {
    subject: $("#subject").val(),
    date: $("#date").val(),
    time: $("#time").val(),
    room: $("#room").val()
  };

  await addSchedule(data);
  load();
});

async function removeItem(id) {
  await deleteSchedule(id);
  load();
}

load();
function checkReminder() {
  const now = new Date();

  schedules.forEach(s => {
    const t = new Date(`${s.date}T${s.time}`);
    const diff = t - now;

    if (diff > 0 && diff <= 600000) {
      alert("⏰ Sắp đến giờ học: " + s.subject);
    }
  });
}

setInterval(checkReminder, 60000);

document
  .getElementById("search")
  .addEventListener("input", searchSchedule);

function searchSchedule(){

  let keyword =
    document
      .getElementById("search")
      .value
      .toLowerCase();

  let filtered = schedules.filter(item =>

    item.subject.toLowerCase().includes(keyword) ||

    item.date.toLowerCase().includes(keyword) ||

    item.time.toLowerCase().includes(keyword) ||

    item.room.toLowerCase().includes(keyword)

  );

  render(filtered);

}