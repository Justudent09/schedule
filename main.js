const swup = new Swup({
    cache: false,
    animationSelector: '[class*="transition-"]'
});

// --- Динамическая загрузка скрипта ---
function loadScript(src, callback) {
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
        console.log(`Script ${src} already loaded.`);
        if (callback) callback();
        return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.body.appendChild(script);
    console.log(`Script ${src} loaded.`);
}

// --- Удаление скриптов ---
function unloadScript(src) {
    const script = document.querySelector(`script[src="${src}"]`);
    if (script) {
        script.remove();
        console.log(`Script ${src} removed.`);
    }
}

// --- Очистка текущей страницы ---
function unloadCurrentPage() {
    const path = window.location.pathname;

    if (path.includes('auth.html') && typeof unloadAuthAnimation === 'function') {
        unloadAuthAnimation();
    } else if (path.includes('index.html') && typeof unloadBannerAnimation === 'function') {
        unloadBannerAnimation();
    } else if (path.includes('schedule.html') && typeof unloadScheduleAnimation === 'function') {
        unloadScheduleAnimation();
    }

    unloadScript('auth.js');
    unloadScript('banner.js');
    unloadScript('schedule.js');
    console.log('Current page unloaded.');
}

// --- Инициализация страниц ---
function initializePage() {
    const path = window.location.pathname;

    if (path.includes('auth.html')) {
        console.log('Initializing Auth page...');
        loadScript('auth.js', () => {
            if (typeof initAuth === 'function') {
                initAuth();
            }
        });
    } else if (path.includes('index.html') || path === '/' || path === '/index.html') {
        console.log('Initializing Index page...');
        loadScript('banner.js', () => {
            if (typeof initBanner === 'function') {
                initBanner();
            }
        });
    } else if (path.includes('schedule.html')) {
        console.log('Initializing Schedule page...');
        loadScript('schedule.js', () => {
            if (typeof initSchedule === 'function') {
                initSchedule();
            }
        });
    }
}

// --- Первичная инициализация страницы ---
function initialPageLoad() {
    console.log('Performing initial page load...');
    initializePage();
}

// --- Swup хуки ---
swup.hooks.before('content:replace', () => {
    console.log('Before content replace: cleaning up current page');
    unloadCurrentPage();
});

swup.hooks.on('page:view', () => {
    console.log('Page view: initializing new page');
    initializePage();
});

// --- Гарантированная инициализация ---
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOMContentLoaded: Initializing initialPageLoad');
        initialPageLoad();
    });
} else {
    console.log('Document already loaded: Initializing initialPageLoad');
    initialPageLoad();
}

// --- Дополнительная страховка ---
window.addEventListener('load', () => {
    console.log('Window fully loaded: Ensuring initialPageLoad was called');
    initialPageLoad();
});