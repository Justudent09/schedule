if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.expand();
}

function selectOption(selected) {
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });

    selected.classList.add('selected');
}