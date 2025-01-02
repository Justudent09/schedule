// --- Инициализация Telegram WebApp API ---
if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.expand(); // Расширяет WebApp на весь экран
    Telegram.WebApp.showAlert('✅ Telegram WebApp API успешно инициализирован');
} else {
    alert('⚠️ Telegram WebApp API не обнаружен');
}

// --- Инициализация анимации Lottie ---
const animationContainer = document.getElementById('animation-container');

if (animationContainer) {
    fetch('assets/DuckEmojiStudent.json', { cache: 'reload' })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(animationData => {
            lottie.loadAnimation({
                container: animationContainer,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: animationData
            });
            Telegram.WebApp.showAlert('✅ Анимация баннера успешно загружена');
        })
        .catch(error => {
            if (Telegram.WebApp) {
                Telegram.WebApp.showAlert(`❌ Ошибка при загрузке анимации: ${error.message}`);
            } else {
                alert(`❌ Ошибка при загрузке анимации: ${error.message}`);
            }
        });
} else {
    Telegram.WebApp.showAlert('⚠️ Контейнер анимации не найден');
}

// --- Логика горизонтальной прокрутки ---
const scrollContainer = document.getElementById('horizontal-scroll');
const scrollItems = document.querySelectorAll('.scroll-item');
const buttons = document.querySelectorAll('#app .button');

if (scrollContainer) {
    scrollContainer.addEventListener('scroll', () => {
        const containerWidth = scrollContainer.offsetWidth;
        const scrollLeft = scrollContainer.scrollLeft;
        const index = Math.round(scrollLeft / containerWidth);

        scrollItems.forEach((item, i) => item.classList.toggle('active', i === index));
        buttons.forEach((button, i) => button.classList.toggle('active', i === index));
    });
    Telegram.WebApp.showAlert('✅ Событие прокрутки успешно добавлено');
} else {
    Telegram.WebApp.showAlert('⚠️ Контейнер прокрутки не найден');
}

// --- Обработчик нажатия на кнопку ---
const joinButton = document.getElementById('joinButton');

if (joinButton) {
    joinButton.addEventListener('click', () => {
        if (window.Telegram && Telegram.WebApp) {
            Telegram.WebApp.openLink('auth.html');
        } else {
            window.location.href = 'auth.html';
        }
    });
    Telegram.WebApp.showAlert('✅ Кнопка перехода к auth.html активирована');
} else {
    Telegram.WebApp.showAlert('⚠️ Кнопка перехода не найдена');
}

// --- Уведомление об успешной инициализации ---
Telegram.WebApp.showAlert('✅ Скрипт banner.js успешно загружен и выполнен');