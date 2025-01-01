Telegram.WebApp.ready();
Telegram.WebApp.MainButton.hide();

Telegram.WebApp.onEvent('themeChanged', function () {
    document.documentElement.className = Telegram.WebApp.colorScheme;
});

// Инициализация анимации
function initializeAuthAnimation() {
    const container = document.getElementById('animation-container');
    if (container) {
        container.innerHTML = ''; // Очистка контейнера
        const timestamp = new Date().getTime(); // Генерация уникального параметра

        fetch(`DuckEmojiTeacher.json?cacheBust=${timestamp}`)
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
function unloadAuth() {
    console.log('Очистка auth.js');
    const container = document.getElementById('animation-container');
    if (container) {
        container.innerHTML = '';
    }
}

// Инициализация страницы
function initAuth() {
    if (document.getElementById('animation-container')) {
        console.log('Инициализация auth.js');
        initializeAuthAnimation();
    }
}

// Инициализация при первой загрузке и переходах Swup
if (document.readyState === 'complete') {
    initAuth();
} else {
    document.addEventListener('DOMContentLoaded', initAuth);
}

if (window.swup) {
    swup.hooks.before('content:replace', unloadAuth);
    swup.hooks.on('page:view', initAuth);
}