// Инициализация Telegram WebApp
Telegram.WebApp.ready();
Telegram.WebApp.MainButton.hide();

// Смена темы в зависимости от Telegram WebApp
Telegram.WebApp.onEvent('themeChanged', function() {
    document.documentElement.className = Telegram.WebApp.colorScheme;
});

// Загрузка и воспроизведение Lottie-анимации
document.addEventListener('DOMContentLoaded', () => {
    fetch('DuckEmoji.json') // Используем JSON вместо TGS
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при загрузке файла: ' + response.statusText);
            }
            return response.json(); // Преобразуем ответ в JSON
        })
        .then(animationData => {
            lottie.loadAnimation({
                container: document.getElementById('animation-container'),
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: animationData // Используем загруженные JSON-данные
            });
        })
        .catch(error => {
            console.error('Ошибка при загрузке анимации:', error);
        });
});