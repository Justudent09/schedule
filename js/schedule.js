if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.expand();
    Telegram.WebApp.lockOrientation();
    Telegram.WebApp.SettingsButton.show();
}

Telegram.WebApp.SettingsButton.onClick(function(){ 
    window.location.href = 'setting.html'; 
});