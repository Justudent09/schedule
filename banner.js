Telegram.WebApp.ready();
Telegram.WebApp.MainButton.hide();

Telegram.WebApp.onEvent('themeChanged', function () {
    document.documentElement.className = Telegram.WebApp.colorScheme;
});

// Инициализация анимации
function initializeBannerAnimation() {
    const container = document.getElementById('animation-container');
    if (container) {
        container.innerHTML = '';
        fetch('DuckEmojiStudent.json', { cache: 'reload' })
            .then(response => response.json())
            .then(animationData => {
                lottie.loadAnimation({
                    container: container,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    animationData: animationData
                });
            })
            .catch(error => console.error('Ошибка при загрузке анимации:', error));
    }
}

// Инициализация скроллинга
function initializeBannerScroll() {
    const scrollContainer = document.getElementById('horizontal-scroll');
    const scrollItems = document.querySelectorAll('.scroll-item');
    const buttons = document.querySelectorAll('#app .button');

    if (scrollContainer) {
        scrollContainer.addEventListener('scroll', () => {
            const containerWidth = scrollContainer.offsetWidth;
            const scrollLeft = scrollContainer.scrollLeft;
            const index = Math.round(scrollLeft / containerWidth);

            scrollItems.forEach((item, i) => item.classList.toggle('active', i === index));
            buttons.forEach((button, i) => button.classList.toggle('active', i === index));
        });
    }
}

// Общая инициализация страницы
function initBanner() {
    if (document.body.contains(document.getElementById('animation-container'))) {
        console.log('Инициализация banner.js');
        initializeBannerAnimation();
        initializeBannerScroll();
    }
}

// Инициализация при загрузке страницы и при переходах через Swup
if (document.readyState === 'complete') {
    initBanner();
} else {
    document.addEventListener('DOMContentLoaded', initBanner);
}

if (window.swup) {
    swup.hooks.on('page:view', initBanner);
}