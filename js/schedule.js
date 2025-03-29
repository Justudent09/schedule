if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.expand();
    Telegram.WebApp.lockOrientation();
    Telegram.WebApp.SettingsButton.show();
}

Telegram.WebApp.onEvent('settingsButtonClicked', function() { 
        window.location.href = 'setting.html'; 
    }); 
}

function deleteItem() {
    Telegram.WebApp.showConfirm("Выйти из аккаунта?", function (confirmed) {
        if (confirmed) {
            const keys = ['userRole', 'userYear', 'userDirection'];

            keys.forEach(key => {
                Telegram.WebApp.CloudStorage.removeItem(key, (error, success) => {
                    if (error) {
                        Telegram.WebApp.showAlert('Ошибка удаления: ' + error);
                    }
                });
            });

            linkButton();
        } else {
        }
    });
}

function linkButton() {
    window.location.href = 'banner.html';
}