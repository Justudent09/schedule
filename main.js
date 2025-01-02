const swup = new Swup({
    cache: false,
    animationSelector: '[class*="transition-"]'
});

// --- Управление скриптами ---
function loadScript(src, callback) {
    if (document.querySelector(`script[src="${src}"]`)) {
        console.log(`Script ${src} already loaded.`);
        if (callback) callback();
        return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.body.appendChild(script);
    console.log(`Script ${src} loaded dynamically.`);
}

function unloadScript(src) {
    const script = document.querySelector(`script[src="${src}"]`);
    if (script) {
        script.remove();
        console.log(`Script ${src} removed.`);
    }
}

// --- Выгрузка анимаций и событий ---
function unloadCurrentPage() {
    const path = window.location.pathname;

    if (path.includes('auth.html') && typeof unloadAuthAnimation === 'function') {
        console.log('Unloading auth animations');
        unloadAuthAnimation();
    } else if (path.includes('index.html') && typeof unloadBannerAnimation === 'function') {
        console.log('Unloading banner animations');
        unloadBannerAnimation();
    } else if (path.includes('schedule.html') && typeof unloadScheduleAnimation === 'function') {
        console.log('Unloading schedule animations');
        unloadScheduleAnimation();
    }

    unloadScript('auth.js');
    unloadScript('banner.js');
    unloadScript('schedule.js');
}

// --- Флаги инициализации ---
let isPageInitialized = false;

// --- Инициализация страниц ---
function initializePage() {
    const path = window.location.pathname;
    console.log(`Initializing page: ${path}`);

    if (path.includes('auth.html')) {
        loadScript('auth.js', () => {
            if (typeof initAuth === 'function') {
                initAuth();
                console.log('Auth page initialized');
            }
        });
    } else if (path.includes('index.html') || path === '/' || path === '/index.html') {
        loadScript('banner.js', () => {
            if (typeof initBanner === 'function') {
                initBanner();
                console.log('Index page initialized');
            }
        });
    } else if (path.includes('schedule.html')) {
        loadScript('schedule.js', () => {
            if (typeof initSchedule === 'function') {
                initSchedule();
                console.log('Schedule page initialized');
            }
        });
    }
}

// --- Гарантированная первичная инициализация ---
function initialPageLoad() {
    if (isPageInitialized) {
        console.log('Page already initialized, skipping...');
        return;
    }

    console.log('Performing guaranteed initial page load');
    initializePage();
    isPageInitialized = true;
}

// --- Swup хуки ---
swup.hooks.before('content:replace', () => {
    console.log('Before content replace: unloading current page');
    unloadCurrentPage();
    isPageInitialized = false;
});

swup.hooks.on('page:view', () => {
    console.log('Page view: initializing new page via Swup');
    initializePage();
    isPageInitialized = true;
});

// --- Гарантированная проверка DOM ---
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM fully loaded, running initialPageLoad');
        initialPageLoad();
    });
} else {
    console.log('Document already loaded, running initialPageLoad');
    initialPageLoad();
}

// --- Дополнительная страховка на случай сбоя ---
window.addEventListener('load', () => {
    if (!isPageInitialized) {
        console.log('Window fully loaded, forcing initialPageLoad');
        initialPageLoad();
    }
});