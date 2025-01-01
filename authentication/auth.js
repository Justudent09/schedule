Telegram.WebApp.ready();
Telegram.WebApp.MainButton.hide();

Telegram.WebApp.onEvent('themeChanged', function() {
    document.documentElement.className = Telegram.WebApp.colorScheme;
});

function initAnimation() {
    fetch('DuckEmojiTeacher.json?' + new Date().getTime()) // предотвращаем кэширование
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при загрузке JSON: ' + response.statusText);
            }
            return response.json();
        })
        .then(animationData => {
            const container = document.getElementById('animation-container');
            if (container) {
                container.innerHTML = ''; // Очищаем контейнер перед новой анимацией
                lottie.loadAnimation({
                    container: container,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    animationData: animationData
                });
            } else {
                console.error('Контейнер анимации не найден.');
            }
        })
        .catch(error => {
            console.error('Ошибка при загрузке анимации:', error);
        });
}

// Инициализация при первой загрузке
document.addEventListener('DOMContentLoaded', initAnimation);

// Инициализация после каждого перехода Swup
document.addEventListener('swup:contentReplaced', initAnimation);

document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.getElementById('horizontal-scroll');
    const scrollItems = document.querySelectorAll('.scroll-item');
    const buttons = document.querySelectorAll('#app .button');

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
});