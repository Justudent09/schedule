const swup = new Swup({
    cache: false
});

// Функция для динамической загрузки скрипта
function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    script.onerror = () => console.error(`Ошибка загрузки скрипта: ${src}`);
    document.body.appendChild(script);
}

// Очистка обработчиков анимаций
function unloadCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('/authentication/')) {
        if (typeof unloadAuthAnimation === 'function') {
            unloadAuthAnimation();
        }
    } else {
        if (typeof unloadBannerAnimation === 'function') {
            unloadBannerAnimation();
        }
    }
}

// Инициализация страниц после загрузки
function initializePage() {
    const path = window.location.pathname;
    if (path.includes('/authentication/')) {
        if (typeof initAuth === 'undefined') {
            loadScript('/authentication/auth.js', () => {
                if (typeof initAuth === 'function') {
                    initAuth();
                }
            });
        } else {
            initAuth();
        }
    } else {
        if (typeof initBanner === 'undefined') {
            loadScript('/banner.js', () => {
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
    unloadCurrentPage();
});

swup.hooks.on('page:view', () => {
    initializePage();
});

// Инициализация при первой загрузке
document.addEventListener('DOMContentLoaded', initializePage);