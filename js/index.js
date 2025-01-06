if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.expand();

    const key1 = 'userRole';
    Telegram.WebApp.CloudStorage.getItem(key1, (error, value) => {
        if (error) {
            window.location.href = 'banner.html';
        } else if (value === '') {
            window.location.href = 'banner.html';
        }
    });

    const key2 = 'userYear';
    Telegram.WebApp.CloudStorage.getItem(key2, (error, value) => {
        if (error) {
            window.location.href = 'banner.html';
        } else if (value ==='') {
            window.location.href = 'banner.html';
        }
    });

    const key3 = 'userDirection';
    Telegram.WebApp.CloudStorage.getItem(key3, (error, value) => {
        if (error) {
            window.location.href = 'banner.html';
        } else if (value === '') {
            window.location.href = 'banner.html';
        }
    });
    
    window.location.href = 'schedule.html';
}

    