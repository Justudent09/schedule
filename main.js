const swup = new Swup({
    cache: false,
    animationSelector: '[class*="transition-"]'
});

// Функция для динамической загрузки скрипта
function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.body.appendChild(script);
}

// Функция для выгрузки скриптов страницы
function unloadCurrentPage() {
    const path = window.location.pathname;

    if (path.includes('auth.html') && typeof unloadAuth === 'function') {
        unloadAuth();
    } else if (path.includes('schedule.html') && typeof unloadSchedule === 'function') {
        unloadSchedule();
    } else if (typeof unloadBanner === 'function') {
        unloadBanner();
    }
}

// Функция для инициализации скриптов страницы
function initializePage() {
    const path = window.location.pathname;

    if (path.includes('auth.html')) {
        if (typeof initAuth === 'undefined') {
            loadScript('auth.js', () => {
                if (typeof initAuth === 'function') {
                    initAuth();
                }
            });
        } else {
            initAuth();
        }
    } else if (path.includes('schedule.html')) {
        if (typeof initSchedule === 'undefined') {
            loadScript('schedule.js', () => {
                if (typeof initSchedule === 'function') {
                    initSchedule();
                }
            });
        } else {
            initSchedule();
        }
    } else {
        if (typeof initBanner === 'undefined') {
            loadScript('banner.js', () => {
                if (typeof initBanner === 'function') {
                    initBanner();
                }
            });
        } else {
            initBanner();
        }
    }
}

// Swup хуки
swup.hooks.before('content:replace', () => {
    unloadCurrentPage(); // Выгрузка текущих скриптов
});

swup.hooks.on('page:view', () => {
    initializePage(); // Инициализация новых скриптов
});

// Первичная инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', initializePage);