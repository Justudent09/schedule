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

// --- Состояние загрузки страниц ---
let pageLoadStep = 0; // Счётчик этапов загрузки

// --- Инициализация страниц ---
function initializePage() {
    pageLoadStep++;

    switch (pageLoadStep) {
        case 1:
            console.log('Step 1: Loading banner.js');
            loadScript('banner.js', () => {
                if (typeof initBanner === 'function') {
                    initBanner();
                }
            });
            break;

        case 2:
            console.log('Step 2: Loading auth.js');
            loadScript('auth.js', () => {
                if (typeof initAuth === 'function') {
                    initAuth();
                }
            });
            break;

        case 3:
            console.log('Step 3: Loading schedule.js');
            loadScript('schedule.js', () => {
                if (typeof initSchedule === 'function') {
                    initSchedule();
                }
            });
            break;

        default:
            console.log('All scripts have been loaded');
            break;
    }
}

// --- Выгрузка скриптов при смене страницы ---
function unloadCurrentPage() {
    console.log('Unloading all scripts for page swap');
    unloadScript('banner.js');
    unloadScript('auth.js');
    unloadScript('schedule.js');
}

// --- Swup хуки ---
swup.hooks.before('content:replace', () => {
    console.log('Before content replace: unloading current page');
    unloadCurrentPage();
});

swup.hooks.on('page:view', () => {
    console.log('Page view: initializing next page');
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