const swup = new Swup({
    cache: false,
    animationSelector: '[class*="transition-"]'
});

// --- Динамическая загрузка скрипта ---
function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.body.appendChild(script);
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
            if (typeof initAuth === 'undefined') {
                loadScript('auth.js', () => {
                    if (typeof initAuth === 'function') {
                        console.log('Initializing Auth page dynamically');
                        initAuth();
                        isAuthInitialized = true;
                    }
                });
            } else {
                console.log('Initializing Auth page');
                initAuth();
                isAuthInitialized = true;
            }
        }
    } else if (path.includes('index.html') || path === '/' || path === '/index.html') {
        if (!isBannerInitialized) {
            if (typeof initBanner === 'undefined') {
                loadScript('banner.js', () => {
                    if (typeof initBanner === 'function') {
                        console.log('Initializing Index page dynamically');
                        initBanner();
                        isBannerInitialized = true;
                    }
                });
            } else {
                console.log('Initializing Index page');
                initBanner();
                isBannerInitialized = true;
            }
        }
    } else if (path.includes('schedule.html')) {
        if (!isScheduleInitialized) {
            if (typeof initSchedule === 'undefined') {
                loadScript('schedule.js', () => {
                    if (typeof initSchedule === 'function') {
                        console.log('Initializing Schedule page dynamically');
                        initSchedule();
                        isScheduleInitialized = true;
                    }
                });
            } else {
                console.log('Initializing Schedule page');
                initSchedule();
                isScheduleInitialized = true;
            }
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
            if (typeof initBanner === 'undefined') {
                loadScript('banner.js', () => {
                    if (typeof initBanner === 'function') {
                        console.log('Guaranteed init: initializing Index page');
                        initBanner();
                        isBannerInitialized = true;
                    }
                });
            } else {
                console.log('Guaranteed init: initializing Index page directly');
                initBanner();
                isBannerInitialized = true;
            }
        }
    }
}

// --- Проверка готовности DOM ---
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', guaranteedInit);
} else {
    guaranteedInit();
}