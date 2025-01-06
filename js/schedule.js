if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.expand();
}

function showSavedRole() {
    const key = 'userRole';

    Telegram.WebApp.CloudStorage.getItem(key, (error, value) => {
        if (error) {
            Telegram.WebApp.showAlert('Ошибка при получении данных: ' + error);
        } else if (value) {
            Telegram.WebApp.showAlert('Сохранённое значение: ' + value);
        } else {
            Telegram.WebApp.showAlert('Значение не найдено');
        }
    });
}

function showSavedYear() {
    const key = 'userYear';

    Telegram.WebApp.CloudStorage.getItem(key, (error, value) => {
        if (error) {
            Telegram.WebApp.showAlert('Ошибка при получении данных: ' + error);
        } else if (value) {
            Telegram.WebApp.showAlert('Сохранённое значение: ' + value);
        } else {
            Telegram.WebApp.showAlert('Значение не найдено');
        }
    });
}