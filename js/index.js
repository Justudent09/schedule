if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.expand();
    Telegram.WebApp.lockOrientation();

    const keys = ['userRole', 'userYear', 'userDirection'];
    let missingData = false;
    let checkedKeys = 0;

    keys.forEach((key) => {
        Telegram.WebApp.CloudStorage.getItem(key, (error, value) => {
            checkedKeys++;
            if (error || value === '') {
                missingData = true;
            }

            // Проверка, все ли ключи уже проверены
            if (checkedKeys === keys.length) {
                if (missingData) {
                    window.location.href = 'banner.html';
                } else {
                    window.location.href = 'schedule.html';
                }
            }
        });
    });
}