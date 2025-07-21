lottie.loadAnimation({
    container: document.getElementById('animation-mood'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'assets/DuckEmojiSkeleton.json'
});

const scheduleList = document.getElementById("schedule-list");

async function fetchScheduleData() {
  try {
    const SPREADSHEET_ID = "15BumXRAA6-mLpiHGsX63VKaAv1rl-wV_o4fG6zWXTU4";
    const API_KEY = "AIzaSyDy-aIidgGD3IpahjjY7Yvfj_K86xp_mW8";
    const SHEET_NAME = "Лист1";
    const RANGE = "A:E"; 

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!${RANGE}?key=${API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
    
    const data = await response.json();
    if (!data.values || data.values.length < 2) throw new Error("Нет данных в таблице");
    
    const [headers, ...rows] = data.values;
    
    return rows.map(row => ({
      room: row[0] || "",
      subject: row[1] || "",
      lecturer: row[2] || "",
      start: row[3] || "",
      end: row[4] || ""
    }));
    
  } catch (error) {
    console.error("Ошибка загрузки расписания:", error);
  }
}

function createLessonBlock(item, index) {
  const now = new Date();
  const [startH, startM] = item.start.split(":").map(Number);
  const [endH, endM] = item.end.split(":").map(Number);
  const startTime = new Date(now.setHours(startH, startM, 0, 0));
  const endTime = new Date(now.setHours(endH, endM, 0, 0));
  const currentTime = new Date();

  const total = endTime - startTime;
  const elapsed = currentTime - startTime;
  const percent = Math.min(100, Math.max(0, (elapsed / total) * 100));

  const isEnded = currentTime >= endTime;
  const isStarted = currentTime >= startTime;

  return `
    <div class="lesson-block">
      <div class="auditorium">
        ${isEnded ? `
  <svg class="checkmark" width="15vw" height="15vw" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 12L10.5 13.5C10.7761 13.7761 11.2239 13.7761 11.5 13.5L15 10" 
          stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>` : `
  <svg class="circle-progress" viewBox="0 0 36 36">
    <path class="bg" d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32" />
    ${isStarted ? `<path class="fg" stroke-dasharray="${percent}, 100" d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32" />` : ''}
  </svg>
  <div class="aud-text">${item.room}</div>`}
      </div>
      <div style="width: 60vw; padding: 0 5vw;">
        <div class="subject-name">${item.subject}</div>
        <div class="lecturer">${item.lecturer}</div>
      </div>
      <div style="width: 15vw;">
        <div class="time-lesson">${item.start}</div>
        <div class="time-lesson">${item.end}</div>
      </div>
    </div>`;
}

async function renderSchedule() {
  try {
    const scheduleData = await fetchScheduleData();
    
    scheduleList.innerHTML = scheduleData.map(createLessonBlock).join("");
    
  } catch (error) {
    console.error("Ошибка рендеринга:", error);
  }
}

(async function init() {
  await renderSchedule();
  
  setInterval(renderSchedule, 1000);
})();