// Инициализация Telegram WebApp
Telegram.WebApp.ready();
Telegram.WebApp.MainButton.hide();

// Смена темы в зависимости от Telegram WebApp
Telegram.WebApp.onEvent('themeChanged', function() {
    document.documentElement.className = Telegram.WebApp.colorScheme;
});

// Загрузка Lottie-анимации
document.addEventListener('DOMContentLoaded', () => {
    fetch('DuckEmoji.json') // Локальный JSON-файл
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
                animationData: animationData // Используем JSON-данные
            });
        })
        .catch(error => {
            console.error('Ошибка при загрузке анимации:', error);
        });
});

// Обработка кнопки
document.querySelector('.bannerButton').addEventListener('click', () => {
    console.log('Кнопка "Использовать расписание" нажата');
    if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
        Telegram.WebApp.close(); // Закрытие мини-приложения
    }
});