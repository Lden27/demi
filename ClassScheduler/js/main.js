if(localStorage.getItem("isLogin") !== "true"){
    window.location.href = "login.html";
}
function logout(){

    localStorage.removeItem("isLogin");

    window.location.href = "login.html";
}
const list = document.getElementById("scheduleList");
const searchInput = document.getElementById("search");

let schedules = [];

async function loadData() {
  schedules = await getSchedules();
  render();
}

function render(data = schedules) {

  document.querySelectorAll(".day").forEach(day => {

    const title = day.querySelector(".day-title").outerHTML;

    day.innerHTML = title;
  });

  const now = new Date();

  data.sort((a, b) => {

    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);

    return dateA - dateB;
  });

  const upcoming = data.filter(s => {

    const lessonDate = new Date(`${s.date}T${s.time}`);

    return lessonDate >= now;
  });

  list.innerHTML = "";

  upcoming.slice(0, 7).forEach(s => {

    list.innerHTML += `

      <div class="subject-card">

        <h3>${s.subject}</h3>

        <p>
          ${s.date} - ${s.time}
        </p>

        <div class="room">
          Phòng: ${s.room}
        </div>

      </div>

    `;
  });

  data.forEach(s => {

    const d = new Date(s.date);

    const thu = d.getDay();

    const map = {
      1: "T2",
      2: "T3",
      3: "T4",
      4: "T5",
      5: "T6",
      6: "T7",
      0: "CN"
    };

    const dayId = map[thu];

    const dayBox = document.getElementById(dayId);

    if(dayBox){

      dayBox.innerHTML += `

        <div class="lesson">

          <b>${s.subject}</b><br>

          ${s.time}

          <br><br>

          Phòng: ${s.room}

        </div>

      `;
    }

  });

}

searchInput.addEventListener("input", function () {

  const keyword = searchInput.value.toLowerCase();

  const filtered = schedules.filter(s => {

    return (
      s.subject.toLowerCase().includes(keyword) ||
      s.room.toLowerCase().includes(keyword) ||
      s.date.toLowerCase().includes(keyword) ||
      s.time.toLowerCase().includes(keyword)
    );

  });

  render(filtered);

});

loadData();