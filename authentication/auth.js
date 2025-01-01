Telegram.WebApp.ready();
Telegram.WebApp.MainButton.hide();

Telegram.WebApp.onEvent('themeChanged', function() {
    document.documentElement.className = Telegram.WebApp.colorScheme;
});

// Функция для инициализации анимации
function initializeAnimation(animationFile) {
    const container = document.getElementById('animation-container');
    if (container) {
        container.innerHTML = ''; // Очищаем контейнер перед новой анимацией
        fetch(animationFile)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке файла: ' + response.statusText);
                }
                return response.json(); 
            })
            .then(animationData => {
                lottie.loadAnimation({
                    container: container,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    animationData: animationData 
                });
            })
            .catch(error => {
                console.error('Ошибка при загрузке анимации:', error);
            });
    }
}

// Функция для инициализации скроллинга и точек
function initializeScroll() {
    const scrollContainer = document.getElementById('horizontal-scroll');
    const scrollItems = document.querySelectorAll('.scroll-item');
    const buttons = document.querySelectorAll('#app .button');

    if (scrollContainer) {
        scrollContainer.addEventListener('scroll', () => {
            const containerWidth = scrollContainer.offsetWidth;
            const scrollLeft = scrollContainer.scrollLeft;
            const index = Math.round(scrollLeft / containerWidth);

            scrollItems.forEach((item, i) => {
                item.classList.toggle('active', i === index);
            });

            buttons.forEach((button, i) => {
                button.classList.toggle('active', i === index);
            });
        });
    }
}

// Общая функция для инициализации всего JS
function initializePage() {
    initializeAnimation('DuckEmojiTeacher.json');
    initializeScroll();
}

// Запускаем при первой загрузке
document.addEventListener('DOMContentLoaded', () => {
    initializePage();
});

// Запускаем при каждом переходе Swup
swup.hooks.on('page:view', () => {
    initializePage();
});