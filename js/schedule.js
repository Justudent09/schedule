if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.expand();
    Telegram.WebApp.lockOrientation();
    Telegram.WebApp.SettingsButton.show();
}

Telegram.WebApp.onEvent('settingsButtonClicked', function() { 
        window.location.href = 'setting.html'; 
    }); 
}