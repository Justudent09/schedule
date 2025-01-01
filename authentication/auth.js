Telegram.WebApp.ready();
Telegram.WebApp.MainButton.hide();

Telegram.WebApp.onEvent('themeChanged', function() {
    document.documentElement.className = Telegram.WebApp.colorScheme;
});

document.addEventListener('swup:contentReplaced', () => {
    fetch('DuckEmojiTeacher.json')
        .then(response => response.json())
        .then(animationData => {
            lottie.loadAnimation({
                container: document.getElementById('animation-container'),
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: animationData
            });
        });
});

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