if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.expand();
}

function deleteItem() {
    const key1 = 'userRole';

    Telegram.WebApp.CloudStorage.removeItem(key1, (error, success) => {
        if (error) {
            Telegram.WebApp.showAlert('Ошибка удаления: ' + error);
        } 
    });

    const key2 = 'userYear';

    Telegram.WebApp.CloudStorage.removeItem(key2, (error, success) => {
        if (error) {
            Telegram.WebApp.showAlert('Ошибка удаления: ' + error);
        }
    });

    const key3 = 'userDirection';

    Telegram.WebApp.CloudStorage.removeItem(key3, (error, success) => {
        if (error) {
            Telegram.WebApp.showAlert('Ошибка удаления: ' + error);
        }
    });

    linkButton();
}

function linkButton() {
    window.location.href = 'banner.html';
}