let bannerAnimationInstance = null;

function initializeBannerAnimation() {
    const container = document.getElementById('animation-container');
    if (container) {
        container.innerHTML = '';
        fetch('DuckEmojiStudent.json', { cache: 'reload' })
            .then(response => response.json())
            .then(animationData => {
                bannerAnimationInstance = lottie.loadAnimation({
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

function initializeBannerScroll() {
    const scrollContainer = document.getElementById('horizontal-scroll');
    if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleBannerScroll);
    }
}

function handleBannerScroll() {
    const scrollContainer = document.getElementById('horizontal-scroll');
    const scrollItems = document.querySelectorAll('.scroll-item');
    const buttons = document.querySelectorAll('#app .button');

    if (scrollContainer) {
        const containerWidth = scrollContainer.offsetWidth;
        const scrollLeft = scrollContainer.scrollLeft;
        const index = Math.round(scrollLeft / containerWidth);

        scrollItems.forEach((item, i) => item.classList.toggle('active', i === index));
        buttons.forEach((button, i) => button.classList.toggle('active', i === index));
    }
}

function unloadBannerAnimation() {
    const scrollContainer = document.getElementById('horizontal-scroll');
    if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleBannerScroll);
    }
    if (bannerAnimationInstance) {
        bannerAnimationInstance.destroy();
        bannerAnimationInstance = null;
    }
    const container = document.getElementById('animation-container');
    if (container) {
        container.innerHTML = '';
    }
}

function initBanner() {
    console.log('Инициализация banner.js');
    initializeBannerAnimation();
    initializeBannerScroll();
}