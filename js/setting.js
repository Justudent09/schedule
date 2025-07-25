if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.expand();
    Telegram.WebApp.lockOrientation();
    Telegram.WebApp.SettingsButton.hide();
    Telegram.WebApp.BackButton.show();

    const items = [
        { key: 'userRole', elementId: 'myRole' },
        { key: 'userYear', elementId: 'myYear' },
        { key: 'userDirection', elementId: 'myDirection' }
    ];

    items.forEach(item => {
        Telegram.WebApp.CloudStorage.getItem(item.key, (error, value) => {
            const element = document.getElementById(item.elementId);
            
            if (item.key === "userRole") {
                switch (value) {
                    case "student":
                        element.innerHTML = "Студент";
                        break;
                    case "teacher":
                        element.innerHTML = "Препод";
                        break;
                }
            } else if (item.key === "userDirection") {
                switch (value) {
                    case "pmi": 
                        element.innerHTML = "ПМИ";
                        break;
                    case "mng": 
                        element.innerHTML = "Мен.";
                        break;
                    case "jur": 
                        element.innerHTML = "Юр.";
                        break;
                    case "phr": 
                        element.innerHTML = "Фарм.";
                        break;
                    case "bio": 
                        element.innerHTML = "Био.";
                        break;
                }
            } else {
                const currentDate = new Date();
                const currentYear = currentDate.getFullYear();
                const currentMonth = currentDate.getMonth() + 1;

                const course = currentMonth <= 6 ? currentYear - value : currentYear - value + 1;

                switch (course) {
                    case 1: 
                    case 4:
                    case 5:
                        element.innerHTML = course + "-ый";
                        break;
                    case 2: 
                    case 6:
                        element.innerHTML = course + "-ой";
                        break;
                    case 3: 
                        element.innerHTML = course + "-ий";
                        break;
                }
            }
        });
    });
}

Telegram.WebApp.BackButton.onClick(function(){ 
    window.location.href = 'schedule.html'; 
});

function deleteItem() {
    Telegram.WebApp.showConfirm("Вы точно хотите выйти?", function (confirmed) {
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
        }
    });
}

function linkButton() {
    window.location.href = 'banner.html';
}

lottie.loadAnimation({
    container: document.getElementById('animation-container'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'assets/DuckEmojiProfile.json'
});