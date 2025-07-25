if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.expand();
    Telegram.WebApp.lockOrientation();
    Telegram.WebApp.SettingsButton.hide();
    Telegram.WebApp.BackButton.hide();
}

lottie.loadAnimation({
    container: document.getElementById('animation-container'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'assets/DuckEmojiWay.json'
});

const inactiveSVG = `
<svg width="6vw" height="6vw" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="3vw" cy="3vw" r="2.7vw" fill="none" stroke="var(--tg-theme-hint-color)" stroke-width="0.6vw"/>
</svg>`;

const activeSVG = `
<svg width="6vw" height="6vw" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="3vw" cy="3vw" r="2.7vw" fill="none" stroke="var(--tg-theme-accent-text-color)" stroke-width="0.6vw"/>
    <circle cx="3vw" cy="3vw" r="1.5vw" fill="var(--tg-theme-accent-text-color)"/>
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

function saveItem() {
    const selectedOption = document.querySelector('.option.selected');
    const key = 'userRole';
    const value = selectedOption ? selectedOption.getAttribute('data-role') : null;

    Telegram.WebApp.CloudStorage.setItem(key, value, (error, success) => {
        if (error) {
            Telegram.WebApp.showAlert('Ошибка сохранения: ' + error);
        }
    });       
    linkButton();
}

function linkButton() {
    const selectedOption = document.querySelector('.option.selected');
    const role = selectedOption ? selectedOption.getAttribute('data-role') : null;

    if (role === 'student') {
        window.location.href = 'studentYear.html';
    } else if (role === 'teacher') {
        window.location.href = 'teacher.html';
    }
}
