const swup = new Swup({
    cache: false,
    animationSelector: '[class*="transition-"]'
});

// --- Динамическая загрузка скрипта ---
function loadScript(src, callback) {
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
        console.log(`Script ${src} already loaded`);
        if (callback) callback();
        return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.body.appendChild(script);
}

// --- Удаление динамически загруженных скриптов ---
function unloadScript(src) {
    const script = document.querySelector(`script[src="${src}"]`);
    if (script) {
        console.log(`Removing script: ${src}`);
        script.remove();
    }
}

// --- Выгрузка скриптов при смене страницы ---
function unloadCurrentPage() {
    console.log('Unloading all scripts for page swap');
    unloadScript('banner.js');
    unloadScript('auth.js');
    unloadScript('schedule.js');
}

// --- Инициализация страницы на основе пути ---
function initializePage() {
    const path = window.location.pathname;

    console.log(`Current path: ${path}`);

    if (path === '/' || path.endsWith('/index.html')) {
        console.log('Loading banner.js for Index page');
        loadScript('banner.js', () => {
            if (typeof initBanner === 'function') {
                initBanner();
            }
        });
    } else if (path.endsWith('/auth.html')) {
        console.log('Loading auth.js for Auth page');
        loadScript('auth.js', () => {
            if (typeof initAuth === 'function') {
                initAuth();
            }
        });
    } else if (path.endsWith('/schedule.html')) {
        console.log('Loading schedule.js for Schedule page');
        loadScript('schedule.js', () => {
            if (typeof initSchedule === 'function') {
                initSchedule();
            }
        });
    } else {
        console.log('No specific script for this page');
    }
}

// --- Swup хуки ---
swup.hooks.before('content:replace', () => {
    console.log('Before content replace: unloading current page');
    unloadCurrentPage();
});

swup.hooks.on('page:view', () => {
    console.log('Page view: initializing the page based on path');
    initializePage();
});

// --- Прямая инициализация при первой загрузке ---
function initialPageLoad() {
    console.log('Initial page load detected');
    initializePage();
}

// --- Проверка готовности DOM ---
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialPageLoad);
} else {
    initialPageLoad();
}