if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.expand();

    const key = 'userRole';
    Telegram.WebApp.CloudStorage.getItem(key, (error, value) => {
        if (error) {
            window.location.href = 'banner.html';
        } else if (value === '') {
            
        } else {
            Telegram.WebApp.showAlert('Значение не найдено');
        }
    });

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

    const key = 'userDirection';
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

    