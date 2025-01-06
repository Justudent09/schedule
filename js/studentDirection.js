if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.expand();
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

const defaultOption = document.querySelector('.option[data-role="1"]');
defaultOption.querySelector('.icon').innerHTML = activeSVG;
defaultOption.classList.add('selected');

Telegram.WebApp.CloudStorage.getItem('userYear', (error, value) => {
    if (error) {
        console.error('Ошибка при получении userYear:', error);
        return;
    }

    if (value === '2023') {
        document.querySelectorAll('.option[data-role="4"], .option[data-role="5"]')
            .forEach(option => option.classList.add('disabled'));
    }
});

function selectOption(selected) {
    if (selected.classList.contains('disabled')) {
        return;
    }

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

    window.location.href = 'schedule.html';
});