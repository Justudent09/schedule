if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.expand();
    Telegram.WebApp.lockOrientation();
    Telegram.WebApp.SettingsButton.hide();
    Telegram.WebApp.BackButton.show();
}

Telegram.WebApp.BackButton.onClick(function(){ 
    window.location.href = 'auth.html'; 
});

lottie.loadAnimation({
    container: document.getElementById('animation-container'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'assets/DuckEmojiDeadend.json'
});