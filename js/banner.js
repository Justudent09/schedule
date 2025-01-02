// Инициализация анимации Lottie
const animationContainer = document.getElementById('animation-container');

if (animationContainer) {
    fetch('../assets/DuckEmojiStudent.json', { cache: 'reload' })
        .then(response => response.json())
        .then(animationData => {
            lottie.loadAnimation({
                container: animationContainer,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: animationData
            });
            console.log('Анимация баннера успешно загружена');
        })
        .catch(error => console.error('Ошибка при загрузке анимации:', error));
}

// Логика горизонтальной прокрутки
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
    console.log('Событие прокрутки успешно добавлено');
}

// Обработчик нажатия на кнопку
const joinButton = document.getElementById('joinButton');

if (joinButton) {
    joinButton.addEventListener('click', () => {
        window.location.href = 'auth.html';
    });
    console.log('Кнопка перехода к auth.html активирована');
}

// Лог для успешной инициализации
console.log('Скрипт banner.js успешно загружен и выполнен');