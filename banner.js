Telegram.WebApp.ready();
Telegram.WebApp.MainButton.hide();

Telegram.WebApp.onEvent('themeChanged', function() {
    document.documentElement.className = Telegram.WebApp.colorScheme;
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('DuckEmoji.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при загрузке файла: ' + response.statusText);
            }
            return response.json(); 
        })
        .then(animationData => {
            lottie.loadAnimation({
                container: document.getElementById('animation-container'),
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: animationData 
            });
        })
        .catch(error => {
            console.error('Ошибка при загрузке анимации:', error);
        });
});

$(function() {
    var buttons = $('.button');
    var scrollContainer = $('#scroll-container');

    scrollContainer.on('scroll', function() {
        var scrollLeft = scrollContainer.scrollLeft(); // Текущее положение прокрутки
        var containerWidth = scrollContainer.width(); // Ширина контейнера
        var sectionIndex = Math.round(scrollLeft / containerWidth); // Индекс секции

        // Сброс активного состояния у всех кнопок
        buttons.removeClass('active');

        // Добавление активного состояния к текущей кнопке
        buttons.eq(sectionIndex).addClass('active');
    });
});