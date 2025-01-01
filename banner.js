Telegram.WebApp.ready();
Telegram.WebApp.MainButton.hide();

Telegram.WebApp.onEvent('themeChanged', function () {
    document.documentElement.className = Telegram.WebApp.colorScheme;
});

// Инициализация анимации
function initializeBannerAnimation() {
    const container = document.getElementById('animation-container');
    if (container) {
        container.innerHTML = ''; // Очистка контейнера
        const timestamp = new Date().getTime(); // Генерация уникального параметра

        fetch(`DuckEmojiStudent.json?cacheBust=${timestamp}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке файла: ' + response.statusText);
                }
                return response.json();
            })
            .then(animationData => {
                lottie.loadAnimation({
                    container: container,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    animationData: animationData
                });
            })
            .catch(error => {
                console.error('Ошибка при загрузке анимации:', error);
            });
    }
}

// Очистка анимации перед заменой контента
function unloadBanner() {
    console.log('Очистка banner.js');
    const container = document.getElementById('animation-container');
    if (container) {
        container.innerHTML = '';
    }
}

// Инициализация страницы
function initBanner() {
    if (document.getElementById('animation-container')) {
        console.log('Инициализация banner.js');
        initializeBannerAnimation();
    }
}

// Инициализация при первой загрузке и переходах Swup
if (document.readyState === 'complete') {
    initBanner();
} else {
    document.addEventListener('DOMContentLoaded', initBanner);
}

if (window.swup) {
    swup.hooks.before('content:replace', unloadBanner);
    swup.hooks.on('page:view', initBanner);
}