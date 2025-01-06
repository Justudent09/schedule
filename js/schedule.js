if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.expand();
}

function deleteItem() {
    const key1 = '';

    Telegram.WebApp.CloudStorage.removeItem(key, (error, success) => {
        if (error) {
            Telegram.WebApp.showAlert('Ошибка удаления: ' + error);
        } else {
            Telegram.WebApp.showAlert('Элемент успешно удалён');
        }
    });
}