const swup = new Swup({
    cache: false,
    animationSelector: '[class*="transition-"]'
});

// Динамическая загрузка скрипта
function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.body.appendChild(script);
}

// Выгрузка текущих анимаций и событий
function unloadCurrentPage() {
    const path = window.location.pathname;

    if (path.includes('auth.html') && typeof unloadAuthAnimation === 'function') {
        unloadAuthAnimation();
    } else if (path.includes('index.html') && typeof unloadBannerAnimation === 'function') {
        unloadBannerAnimation();
    } else if (path.includes('schedule.html') && typeof unloadScheduleAnimation === 'function') {
        unloadScheduleAnimation();
    }
}

// Инициализация страниц
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
    } else if (path.includes('index.html') || path === '/' || path === '/index.html') {
        if (typeof initBanner === 'undefined') {
            loadScript('banner.js', () => {
                if (typeof initBanner === 'function') {
                    initBanner();
                }
            });
        } else {
            initBanner();
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
    }
}

// Swup хуки
swup.hooks.before('content:replace', () => {
    unloadCurrentPage(); // Выгрузка текущих анимаций
});

swup.hooks.on('page:view', () => {
    initializePage(); // Инициализация новой страницы
});

// Первичная инициализация
document.addEventListener('DOMContentLoaded', () => {
    initializePage();

    // Явная инициализация banner.js при первой загрузке index.html
    if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
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
});