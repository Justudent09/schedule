const swup = new Swup({
    cache: false,
    animationSelector: '[class*="transition-"]'
});

// --- Динамическая загрузка скрипта ---
function loadScript(src, callback) {
    // Проверяем, есть ли уже скрипт на странице
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

// --- Выгрузка текущих анимаций и событий ---
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

    // Удаляем динамически загруженные скрипты
    unloadScript('auth.js');
    unloadScript('banner.js');
    unloadScript('schedule.js');
}

// --- Флаги для предотвращения дублирования ---
let isBannerInitialized = false;
let isAuthInitialized = false;
let isScheduleInitialized = false;

// --- Инициализация страниц ---
function initializePage() {
    const path = window.location.pathname;

    if (path.includes('auth.html')) {
        if (!isAuthInitialized) {
            console.log('Initializing Auth page');
            loadScript('auth.js', () => {
                if (typeof initAuth === 'function') {
                    initAuth();
                    isAuthInitialized = true;
                }
            });
        }
    } else if (path.includes('index.html') || path === '/' || path === '/index.html') {
        if (!isBannerInitialized) {
            console.log('Initializing Index page');
            loadScript('banner.js', () => {
                if (typeof initBanner === 'function') {
                    initBanner();
                    isBannerInitialized = true;
                }
            });
        }
    } else if (path.includes('schedule.html')) {
        if (!isScheduleInitialized) {
            console.log('Initializing Schedule page');
            loadScript('schedule.js', () => {
                if (typeof initSchedule === 'function') {
                    initSchedule();
                    isScheduleInitialized = true;
                }
            });
        }
    }
}

// --- Swup хуки ---
swup.hooks.before('content:replace', () => {
    console.log('Before content replace: unloading current page');
    unloadCurrentPage();

    // Сбрасываем флаги
    isBannerInitialized = false;
    isAuthInitialized = false;
    isScheduleInitialized = false;
});

swup.hooks.on('page:view', () => {
    console.log('Page view: initializing new page');
    initializePage();
});

// --- Гарантированная первичная инициализация ---
function guaranteedInit() {
    console.log('Guaranteed initialization');
    initializePage();

    // Дополнительная проверка для index.html и корневого пути
    const path = window.location.pathname;
    if (path === '/' || path.includes('index.html')) {
        if (!isBannerInitialized) {
            loadScript('banner.js', () => {
                if (typeof initBanner === 'function') {
                    initBanner();
                    isBannerInitialized = true;
                }
            });
        }
    }
}

// --- Проверка готовности DOM ---
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', guaranteedInit);
} else {
    guaranteedInit();
}