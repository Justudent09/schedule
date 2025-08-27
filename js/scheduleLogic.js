// scheduleLogic.js

lottie.loadAnimation({
    container: document.getElementById('animation-mood'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'assets/DuckEmojiSkeleton.json'
});

const scheduleList = document.getElementById("schedule-list");

// Функция для отображения индикатора загрузки
function showLoadingAnimation() {
    scheduleList.innerHTML = `
        <div class="loading-container" style="display: flex; justify-content: center; align-items: center; height: 100%;">
            <div id="loading-animation" style="width: 20vw; height: 20vw;"></div>
        </div>
    `;
    
    // Загружаем анимацию загрузки
    lottie.loadAnimation({
        container: document.getElementById('loading-animation'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/DuckEmojiLoading.json'
    });
}

// Функция для плавного скрытия анимации загрузки
function hideLoadingAnimation() {
    const loadingContainer = document.querySelector('.loading-container');
    if (loadingContainer) {
        loadingContainer.style.opacity = '0';
        loadingContainer.style.transition = 'opacity 0.5s ease';
        
        // Удаляем элемент после завершения анимации
        setTimeout(() => {
            if (loadingContainer.parentNode) {
                loadingContainer.parentNode.removeChild(loadingContainer);
            }
        }, 500);
    }
}

// Показываем загрузку сразу при запуске
showLoadingAnimation();

async function getUserSettings() {
    if (window.Telegram?.WebApp) {
        return new Promise((resolve) => {
            Telegram.WebApp.CloudStorage.getItem('userRole', (_, role) => {
                Telegram.WebApp.CloudStorage.getItem('userDirection', (_, direction) => {
                    Telegram.WebApp.CloudStorage.getItem('userYear', (_, year) => {
                        resolve({ 
                            role: role || 'student',
                            direction: direction || 'pmi',
                            year: year || new Date().getFullYear().toString()
                        });
                    });
                });
            });
        });
    }
    return {
        role: localStorage.getItem('userRole') || 'student',
        direction: localStorage.getItem('userDirection') || 'pmi',
        year: localStorage.getItem('userYear') || new Date().getFullYear().toString()
    };
}

function calculateCourse(year) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    return currentMonth <= 6 ? currentYear - year : currentYear - year + 1;
}

function getSheetNameForCourse(course) {
    const courses = {
        1: "1-й курс",
        2: "2-й курс",
        3: "3-й курс",
        4: "4-й курс",
        5: "5-й курс",
        6: "6-й курс"
    };
    return courses[course]; 
}

function getColumnsForDirection(direction) {
    const columns = {
        pmi: "A:E",   // ПМИ
        mng: "F:J",   // Менеджмент
        jur: "K:O",   // Юристы
        phr: "P:T",   // Фармацевты
        bio: "U:Y"    // Биологи
    };
    return columns[direction]; 
}

async function fetchScheduleData() {
    try {
        const userSettings = await getUserSettings();

        if (userSettings.role === 'teacher') {
            return fetchTeacherSchedule();
        }

        const course = calculateCourse(parseInt(userSettings.year));
        const sheetName = getSheetNameForCourse(course);
        const columnsRange = getColumnsForDirection(userSettings.direction);

        const SPREADSHEET_ID = "15BumXRAA6-mLpiHGsX63VKaAv1rl-wV_o4fG6zWXTU4";
        const API_KEY = "AIzaSyDy-aIidgGD3IpahjjY7Yvfj_K86xp_mW8";
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${sheetName}!${columnsRange}?key=${API_KEY}`;

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
        return [];
    }
}

async function fetchTeacherSchedule() {
    try {
        const SPREADSHEET_ID = "15BumXRAA6-mLpiHGsX63VKaAv1rl-wV_o4fG6zWXTU4";
        const API_KEY = "AIzaSyDy-aIidgGD3IpahjjY7Yvfj_K86xp_mW8";
        const SHEET_NAME = "Преподаватели";
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
            group: row[2] || "", 
            start: row[3] || "",
            end: row[4] || ""
        }));

    } catch (error) {
        console.error("Ошибка загрузки расписания преподавателей:", error);
        return [];
    }
}

function createLessonBlock(item, index, array, isTeacher = false) {
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
            <div style="width: ${isTeacher ? '50vw' : '60vw'}; padding: 0 5vw;">
                <div class="subject-name">${item.subject}</div>
                <div class="lecturer">${isTeacher ? item.group : item.lecturer}</div>
            </div>
            <div style="width: 15vw;">
                <div class="time-lesson">${item.start}</div>
                <div class="time-lesson">${item.end}</div>
            </div>
        </div>
        ${index < array.length - 1 ? '<div class="line"></div>' : ''}`;
}

async function renderSchedule() {
    try {
        const userSettings = await getUserSettings();
        const scheduleData = await fetchScheduleData();

        const isTeacher = userSettings.role === 'teacher';
        
        // Сначала скрываем анимацию загрузки
        hideLoadingAnimation();
        
        // Ждем завершения анимации перед отображением контента
        setTimeout(() => {
            if (scheduleData.length === 0) {
                scheduleList.innerHTML = '<div style="text-align: center; padding: 20vw; color: var(--hint-color);">Расписание не найдено</div>';
            } else {
                scheduleList.innerHTML = scheduleData.map((item, index, array) => 
                    createLessonBlock(item, index, array, isTeacher)).join("");
            }
        }, 500); // Ждем завершения анимации исчезновения

    } catch (error) {
        console.error("Ошибка рендеринга:", error);
        hideLoadingAnimation();
        setTimeout(() => {
            scheduleList.innerHTML = '<div class="error" style="text-align: center; padding: 20vw; color: var(--destructive-text-color);">Ошибка загрузки расписания</div>';
        }, 500);
    }
}

(async function init() {
    // Показываем загрузку сразу, затем рендерим расписание
    await renderSchedule();
    setInterval(renderSchedule, 60000); // Обновляем каждую минуту вместо каждой секунды
})();