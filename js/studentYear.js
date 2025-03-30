if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.expand();
    Telegram.WebApp.lockOrientation();
    Telegram.WebApp.SettingsButton.hide();
    Telegram.WebApp.BackButton.hide();
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

document.querySelectorAll('.option[data-role="3"], .option[data-role="4"], .option[data-role="5"], .option[data-role="6"]')
    .forEach(option => option.classList.add('disabled'));

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

function saveItem() {
    const selectedOption = document.querySelector('.option.selected');
    const key = 'userYear';
    const course = selectedOption ? parseInt(selectedOption.getAttribute('data-role')) : null;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const value = currentMonth <= 6 ? currentYear - course : currentYear - course + 1;

    Telegram.WebApp.CloudStorage.setItem(key, value.toString(), (error, success) => {
        if (error) {
            Telegram.WebApp.showAlert('Ошибка сохранения: ' + error);
        }
    });

    linkButton();
}

function linkButton() {
    window.location.href = 'studentDirection.html';
}
