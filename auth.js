let authAnimationInstance = null;

function initializeAuthAnimation() {
    const container = document.getElementById('animation-container');
    if (container) {
        container.innerHTML = '';
        fetch('DuckEmojiTeacher.json', { cache: 'reload' })
            .then(response => response.json())
            .then(animationData => {
                authAnimationInstance = lottie.loadAnimation({
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

function initializeAuthScroll() {
    const scrollContainer = document.getElementById('horizontal-scroll');
    if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleAuthScroll);
    }
}

function handleAuthScroll() {
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

function unloadAuthAnimation() {
    const scrollContainer = document.getElementById('horizontal-scroll');
    if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleAuthScroll);
    }
    if (authAnimationInstance) {
        authAnimationInstance.destroy();
        authAnimationInstance = null;
    }
    const container = document.getElementById('animation-container');
    if (container) {
        container.innerHTML = '';
    }
}

function initAuth() {
    console.log('Инициализация auth.js');
    initializeAuthAnimation();
    initializeAuthScroll();
}