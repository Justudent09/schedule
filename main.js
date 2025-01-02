const swup = new Swup({
    cache: false,
    animationSelector: '[class*="transition-"]'
});

// --- Динамическая загрузка скрипта ---
function loadScript(src, callback) {
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
        console.log(`[INFO] Script ${src} already loaded.`);
        if (callback) callback();
        return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.body.appendChild(script);
    console.log(`[INFO] Script ${src} loaded.`);
}

// --- Удаление скрипта ---
function unloadScript(src) {
    const script = document.querySelector(`script[src="${src}"]`);
    if (script) {
        script.remove();
        console.log(`[INFO] Script ${src} removed.`);
    }
}

// --- Чистка анимаций и событий ---
function unloadCurrentPage() {
    console.log('[INFO] Unloading current page animations and events.');

    if (typeof unloadAuthAnimation === 'function') {
        unloadAuthAnimation();
    }
    if (typeof unloadBannerAnimation === 'function') {
        unloadBannerAnimation();
    }
    if (typeof unloadScheduleAnimation === 'function') {
        unloadScheduleAnimation();
    }

    unloadScript('auth.js');
    unloadScript('banner.js');
    unloadScript('schedule.js');
}

// --- Инициализация страницы ---
function initializePage() {
    const path = window.location.pathname;
    console.log(`[INFO] Initializing page: ${path}`);

    if (path.includes('auth.html')) {
        loadScript('auth.js', () => {
            if (typeof initAuth === 'function') {
                initAuth();
                console.log('[INFO] Auth page initialized.');
            }
        });
    } else if (path.includes('index.html') || path === '/' || path === '/index.html') {
        loadScript('banner.js', () => {
            if (typeof initBanner === 'function') {
                initBanner();
                console.log('[INFO] Index page initialized.');
            }
        });
    } else if (path.includes('schedule.html')) {
        loadScript('schedule.js', () => {
            if (typeof initSchedule === 'function') {
                initSchedule();
                console.log('[INFO] Schedule page initialized.');
            }
        });
    }
}

// --- Гарантированная первичная инициализация ---
function initialPageLoad() {
    console.log('[INFO] Performing initial page load.');
    initializePage();
}

// --- Swup хуки ---
swup.hooks.before('content:replace', () => {
    console.log('[INFO] Before content replace: cleaning up current page.');
    unloadCurrentPage();
});

swup.hooks.on('page:view', () => {
    console.log('[INFO] Page view: initializing new page via Swup.');
    initializePage();
});

// --- DOMContentLoaded (Гарантия при первой загрузке) ---
document.addEventListener('DOMContentLoaded', () => {
    console.log('[INFO] DOM fully loaded. Performing guaranteed initialization.');
    initialPageLoad();
});

// --- Window Load (Резервная страховка) ---
window.addEventListener('load', () => {
    console.log('[INFO] Window fully loaded. Ensuring initialization.');
    initialPageLoad();
});