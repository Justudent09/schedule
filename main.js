const swup = new Swup({
    cache: false
});

// Функция для динамической загрузки скрипта
function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.body.appendChild(script);
}

// Очистка анимаций перед заменой контента
function unloadCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('authentication/auth.html')) {
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
    if (path.includes('authentication/auth.html')) {
        if (typeof initAuth === 'undefined') {
            loadScript('authentication/auth.js', () => {
                if (typeof initAuth === 'function') {
                    initAuth();
                }
            });
        } else {
            initAuth();
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
    unloadCurrentPage();
});

swup.hooks.on('page:view', () => {
    initializePage();
});

// Инициализация при первой загрузке
document.addEventListener('DOMContentLoaded', initializePage);