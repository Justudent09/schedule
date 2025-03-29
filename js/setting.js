if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.expand();
    Telegram.WebApp.lockOrientation();
    Telegram.WebApp.BackButton.show();
    Telegram.WebApp.SettingsButton.hide();
}

Telegram.WebApp.onEvent('backButtonClicked', function() { 
    window.location.href = 'schedule.html';       
});

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