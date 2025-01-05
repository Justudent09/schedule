if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.expand();
}

const animationContainer = document.getElementById('animation-container');

if (animationContainer) {
    fetch('assets/DuckEmojiWay.json', { cache: 'reload' })
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
<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9" fill="none" stroke="var(--tg-theme-hint-color)" stroke-width="2"/>
</svg>`;

const activeSVG = `
<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9" fill="none" stroke="var(--tg-theme-accent-text-color)" stroke-width="2"/>
    <circle cx="10" cy="10" r="5" fill="var(--tg-theme-accent-text-color)"/>
</svg>`;

document.querySelectorAll('.option').forEach(option => {
    option.querySelector('.icon').innerHTML = inactiveSVG;
    option.classList.remove('selected');
});

const defaultOption = document.querySelector('.option[data-role="student"]');
defaultOption.querySelector('.icon').innerHTML = activeSVG;
defaultOption.classList.add('selected');

function selectOption(selected) {
    document.querySelectorAll('.option').forEach(option => {
        option.querySelector('.icon').innerHTML = inactiveSVG;
        option.classList.remove('selected');
    });

    selected.querySelector('.icon').innerHTML = activeSVG; 
    selected.classList.add('selected'); 
}

document.getElementById('joinButton').addEventListener('click', () => {
    const selectedOption = document.querySelector('.option.selected');
    const role = selectedOption ? selectedOption.getAttribute('data-role') : null;

    if (role === 'student') {
        window.location.href = 'student.html';
    } else if (role === 'teacher') {
        window.location.href = 'teacher.html';
    } else {
        alert('Выберите роль перед продолжением');
    }
});
