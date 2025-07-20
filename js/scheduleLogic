const scheduleData = [
    {
        room: "2Л1",
        subject: "Случайные процессы",
        lecturer: "преп. М.Н.Столбяев",
        start: "09:00",
        end: "10:30"
    },
    {
        room: "2Л1",
        subject: "Введение в математическую экономику",
        lecturer: "доц. Б.Б.Клеткин",
        start: "10:40",
        end: "12:10"
    },
    {
        room: "2C2",
        subject: "Методы оптимизации",
        lecturer: "преп. М.Н.Столбяев",
        start: "14:00",
        end: "15:30"
    },
    {
        room: "2C2",
        subject: "Методы оптимизации",
        lecturer: "преп. М.Н.Столбяев",
        start: "15:40",
        end: "17:10"
    },
    {
        room: "C/3",
        subject: "Физкультура",
        lecturer: "проф. Ронни Коулмэн",
        start: "17:20",
        end: "18:50"
    }
];

const scheduleList = document.getElementById("schedule-list");

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

function renderSchedule() {
    scheduleList.innerHTML = scheduleData.map(createLessonBlock).join("");
}

renderSchedule();
setInterval(renderSchedule, 1000);