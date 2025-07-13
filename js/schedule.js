if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.expand();
    Telegram.WebApp.lockOrientation();
    Telegram.WebApp.SettingsButton.show();
    Telegram.WebApp.BackButton.hide();
}

Telegram.WebApp.SettingsButton.onClick(function(){ 
    window.location.href = 'setting.html'; 
});
    
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

const textBlocks = document.querySelectorAll('.scroll-item .text');
textBlocks.forEach((block, index) => {
    block.textContent = shortTitles[index];
});

scrollItems.forEach((item, index) => {
    item.style.backgroundColor = newsColors[index];
});

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

const fullscreenOverlay = document.getElementById('fullscreen-overlay');
const fullscreenContent = document.getElementById('fullscreen-content');
const fullscreenAnimation = document.getElementById('fullscreen-animation');

scrollItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openFullscreen(index);
    });
});

function openFullscreen(index) {

    fullscreenOverlay.dataset.currentIndex = index;

    const scrollItemAnim = document.querySelectorAll('.animation-container')[index];
    scrollItemAnim.style.opacity = '0'; 
    document.getElementById('fullscreen-text').innerHTML = fullDetails[index];
            
    fetch(animations[index], { cache: 'default' })
        .then(response => response.json())
        .then(animationData => {
            fullscreenAnimation.innerHTML = '';
                lottie.loadAnimation({
                    container: fullscreenAnimation,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    animationData: animationData
                });
            });
    
    fullscreenOverlay.classList.add('show');
    setTimeout(() => {
        fullscreenContent.classList.add('show');
    }, 10);

    fullscreenOverlay.scrollTop = 0;
}

fullscreenOverlay.addEventListener('click', () => {
    const index = fullscreenOverlay.dataset.currentIndex;
    const scrollItemAnim = document.querySelectorAll('.animation-container')[index];
    scrollItemAnim.style.opacity = '1';
    
    closeFullscreen();
});

function closeFullscreen() {

    fullscreenAnimation.innerHTML = '';
    
    fullscreenContent.classList.remove('show');
    setTimeout(() => {
        fullscreenOverlay.classList.remove('show');
        
        const index = fullscreenOverlay.dataset.currentIndex;
        if (index !== undefined) {
            const scrollItemAnim = document.querySelectorAll('.animation-container')[index];
            scrollItemAnim.style.opacity = '1';
        }
    }, 10);
}
