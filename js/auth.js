if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.expand();
}

const animationContainer = document.getElementById('animation-container');

if (animationContainer) {
    fetch('assets/DuckEmojiTeacher.json', { cache: 'reload' })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
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
            Telegram.WebApp.showAlert(`❌ Ошибка при загрузке анимации: ${error.message}`);
        });
} else {
    Telegram.WebApp.showAlert('⚠️ Контейнер анимации не найден');
}

const inactiveSVG = `
    <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" {...restProps}>
        <path
            d="M6.4 1h7.2c1.14 0 1.93 0 2.55.05.6.05.95.14 1.21.28a3 3 0 0 1 1.31 1.3c.14.27.23.62.28 1.22.05.62.05 1.41.05 2.55v7.2c0 1.14 0 1.93-.05 2.55-.05.6-.14.95-.28 1.21a3 3 0 0 1-1.3 1.31c-.27.14-.62.23-1.22.28-.62.05-1.41.05-2.55.05H6.4c-1.14 0-1.93 0-2.55-.05-.6-.05-.95-.14-1.21-.28a3 3 0 0 1-1.31-1.3 3.2 3.2 0 0 1-.28-1.22A34.7 34.7 0 0 1 1 13.6V6.4c0-1.14 0-1.93.05-2.55.05-.6.14-.95.28-1.21a3 3 0 0 1 1.3-1.31 3.2 3.2 0 0 1 1.22-.28C4.47 1 5.26 1 6.4 1Z"
            stroke="var(--tg-theme-hint-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
`;

const activeSVG = `
    <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" {...restProps}>
        <path fillRule="evenodd" clipRule="evenodd"
            d="M.48 2.87C0 3.88 0 5.2 0 7.8v4.4c0 2.61 0 3.92.48 4.93a5 5 0 0 0 2.4 2.4c1 .47 2.3.47 4.92.47h4.4c2.61 0 3.92 0 4.93-.48a5 5 0 0 0 2.4-2.4c.47-1 .47-2.3.47-4.92V7.8c0-2.61 0-3.92-.48-4.93a5 5 0 0 0-2.4-2.4C16.13 0 14.83 0 12.2 0H7.8C5.19 0 3.88 0 2.87.48a5 5 0 0 0-2.4 2.4ZM15.7 7.46a1 1 0 0 0-1.42-1.42L8 12.34l-2.3-2.3a1 1 0 1 0-1.4 1.42l3 3a1 1 0 0 0 1.4 0l7-7Z"
            fill="var(--tg-theme-accent-text-color)" />
        <path fillRule="evenodd" clipRule="evenodd"
            d="M15.7 7.46a1 1 0 0 0-1.4-1.42L8 12.34l-2.3-2.3a1 1 0 1 0-1.4 1.42l3 3a1 1 0 0 0 1.4 0l7-7Z" fill="var(--tg-theme-bg-color)" />
    </svg>
`;

document.querySelectorAll('.option').forEach(option => {
    option.querySelector('.icon').innerHTML = inactiveSVG;
});

function selectOption(selected) {
    document.querySelectorAll('.option').forEach(option => {
        option.querySelector('.icon').innerHTML = inactiveSVG;
    });

    selected.querySelector('.icon').innerHTML = activeSVG;
}

document.querySelector('.option[data-role="student"] .icon').innerHTML = activeSVG;