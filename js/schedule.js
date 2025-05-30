if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.expand();
    Telegram.WebApp.lockOrientation();
    Telegram.WebApp.SettingsButton.show();
    Telegram.WebApp.BackButton.hide();
}

Telegram.WebApp.SettingsButton.onClick(function(){ 
    window.location.href = 'setting.html'; 
});

const animations = [
    'assets/DuckEmojiPodcast.json',
    'assets/DuckEmojiGaming.json'
];
    
animations.forEach((animationUrl, index) => {
    const containerId = `animation-container-${index + 1}`;
    const animationContainer = document.getElementById(containerId);
      
    if (animationContainer) {
        fetch(animationUrl, { cache: 'default' })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                return response.json();
            })
            .then(animationData => {
                lottie.loadAnimation({
                    container: animationContainer,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    animationData: animationData
                });
            })
        .catch(error => {
            console.error(`Ошибка загрузки анимации ${index + 1}:`, error);
        });
    } else {
        console.warn(`Контейнер ${containerId} не найден`);
    }
});

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
} else {
    Telegram.WebApp.showAlert('⚠️ Контейнер прокрутки не найден');
}