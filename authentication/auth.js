Telegram.WebApp.ready();
Telegram.WebApp.MainButton.hide();

Telegram.WebApp.onEvent('themeChanged', function () {
    document.documentElement.className = Telegram.WebApp.colorScheme;
});

// Инициализация анимации
function initializeAuthAnimation() {
    const container = document.getElementById('animation-container');
    if (container) {
        container.innerHTML = '';
        fetch('DuckEmojiTeacher.json', { cache: 'reload' })
            .then(response => response.json())
            .then(animationData => {
                lottie.loadAnimation({
                    container: container,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    animationData: animationData
                });
            })
            .catch(error => console.error('Ошибка при загрузке анимации:', error));
    }
}

// Инициализация скроллинга
function initializeAuthScroll() {
    const scrollContainer = document.getElementById('horizontal-scroll');
    if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleScroll);
    }
}

function handleScroll() {
    const scrollContainer = document.getElementById('horizontal-scroll');
    const scrollItems = document.querySelectorAll('.scroll-item');
    const buttons = document.querySelectorAll('#app .button');

    if (scrollContainer) {
        const containerWidth = scrollContainer.offsetWidth;
        const scrollLeft = scrollContainer.scrollLeft;
        const index = Math.round(scrollLeft / containerWidth);

        scrollItems.forEach((item, i) => item.classList.toggle('active', i === index));
        buttons.forEach((button, i) => button.classList.toggle('active', i === index));
    }
}

// Очистка обработчиков перед заменой контента
function unloadAuth() {
    console.log('Очистка auth.js');
    const scrollContainer = document.getElementById('horizontal-scroll');
    if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
    }
    const container = document.getElementById('animation-container');
    if (container) {
        container.innerHTML = ''; // Очистка анимации
    }
}

// Общая инициализация страницы
function initAuth() {
    if (document.getElementById('animation-container')) {
        console.log('Инициализация auth.js');
        initializeAuthAnimation();
        initializeAuthScroll();
    }
}

// Инициализация
if (document.readyState === 'complete') {
    initAuth();
} else {
    document.addEventListener('DOMContentLoaded', initAuth);
}

// Хуки Swup
if (window.swup) {
    swup.hooks.before('content:replace', unloadAuth);
    swup.hooks.on('page:view', initAuth);
}