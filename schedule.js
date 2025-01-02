let scheduleAnimationInstance = null;

function initializeScheduleAnimation() {
    const container = document.getElementById('animation-container');
    if (container) {
        container.innerHTML = '';
        fetch('DuckEmojiSchedule.json', { cache: 'reload' })
            .then(response => response.json())
            .then(animationData => {
                scheduleAnimationInstance = lottie.loadAnimation({
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

function initializeScheduleScroll() {
    const scrollContainer = document.getElementById('horizontal-scroll');
    if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleScheduleScroll);
    }
}

function handleScheduleScroll() {
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

function unloadScheduleAnimation() {
    const scrollContainer = document.getElementById('horizontal-scroll');
    if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScheduleScroll);
    }
    if (scheduleAnimationInstance) {
        scheduleAnimationInstance.destroy();
        scheduleAnimationInstance = null;
    }
    const container = document.getElementById('animation-container');
    if (container) {
        container.innerHTML = '';
    }
}

function initSchedule() {
    console.log('Инициализация schedule.js');
    initializeScheduleAnimation();
    initializeScheduleScroll();
}