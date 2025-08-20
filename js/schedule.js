// Кэш для предзагруженных анимаций
let animationCache = [];

// Предзагрузка всех анимаций
function preloadAnimations() {
    const animationPromises = animations.map(animationUrl => 
        fetch(animationUrl, { cache: 'force-cache' })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                return response.json();
            })
            .catch(error => {
                console.error("Ошибка загрузки анимации:", error);
                return null;
            })
    );

    return Promise.all(animationPromises);
}

// Инициализация Telegram WebApp
if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.expand();
    Telegram.WebApp.lockOrientation();
    Telegram.WebApp.SettingsButton.show();
    Telegram.WebApp.BackButton.hide();
}

Telegram.WebApp.SettingsButton.onClick(function(){ 
    window.location.href = 'setting.html'; 
});

// Предзагрузка анимаций и инициализация
preloadAnimations().then(animationDataArray => {
    animationCache = animationDataArray;
    
    // Инициализация анимаций из кэша
    animations.forEach((_, index) => {
        const containerId = `animation-container-${index + 1}`;
        const animationContainer = document.getElementById(containerId);

        if (animationContainer && animationCache[index]) {
            lottie.loadAnimation({
                container: animationContainer,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: animationCache[index]
            });
        }
    });
});

// Остальной код без изменений
const scrollContainer = document.getElementById('horizontal-scroll');
const scrollItems = document.querySelectorAll('.scroll-item');
const buttons = document.querySelectorAll('#app .button');

const textBlocks = document.querySelectorAll('.scroll-item .text');
textBlocks.forEach((block, index) => {
    block.textContent = shortTitles[index];
});

scrollItems.forEach((item, index) => {
    item.style.backgroundColor = newsColors[index];
});

if (scrollContainer) {
    scrollContainer.addEventListener('scroll', () => {
        const containerWidth = scrollContainer.offsetWidth;
        const scrollLeft = scrollContainer.scrollLeft;
        const index = Math.round(scrollLeft / containerWidth);

        scrollItems.forEach((item, i) => item.classList.toggle('active', i === index));
        buttons.forEach((button, i) => button.classList.toggle('active', i === index));
    });
} else {
    Telegram.WebApp.showAlert('⚠️ Контейнер прокрутки не найден');
}

const fullscreenOverlay = document.getElementById('fullscreen-overlay');
const fullscreenContent = document.getElementById('fullscreen-content');
const fullscreenAnimation = document.getElementById('fullscreen-animation');
const fadeElement = document.querySelector('.fade'); 

scrollItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openFullscreen(index);
    });
});

function openFullscreen(index) {
    fullscreenOverlay.dataset.currentIndex = index;

    const scrollItemAnim = document.querySelectorAll('.animation-container')[index];
    if (scrollItemAnim) scrollItemAnim.style.opacity = '0'; 
    
    document.getElementById('fullscreen-text').innerHTML = fullDetails[index];

    // Используем предзагруженную анимацию из кэша
    if (animationCache[index]) {
        fullscreenAnimation.innerHTML = '';
        lottie.loadAnimation({
            container: fullscreenAnimation,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationCache[index]
        });
    }

    fullscreenOverlay.classList.add('show');
    setTimeout(() => {
        fullscreenContent.classList.add('show');
    }, 10);

    if (fadeElement) fadeElement.scrollTop = 0;
}

fullscreenOverlay.addEventListener('click', () => {
    const index = fullscreenOverlay.dataset.currentIndex;
    const scrollItemAnim = document.querySelectorAll('.animation-container')[index];
    if (scrollItemAnim) scrollItemAnim.style.opacity = '1';

    closeFullscreen();
});

function closeFullscreen() {
    fullscreenAnimation.innerHTML = '';

    fullscreenContent.classList.remove('show');
    setTimeout(() => {
        fullscreenOverlay.classList.remove('show');

        const index = fullscreenOverlay.dataset.currentIndex;
        if (index !== undefined) {
            const scrollItemAnim = document.querySelectorAll('.animation-container')[index];
            if (scrollItemAnim) scrollItemAnim.style.opacity = '1';
        }
    }, 10);
}

function formatDate(date) {
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    const dayOfWeek = days[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];

    return `${dayOfWeek}, ${dayOfMonth} ${month}`;
}

// Обновляем дату только если элемент существует
const currentDateElement = document.getElementById('current-date');
if (currentDateElement) {
    currentDateElement.textContent = formatDate(new Date());
}