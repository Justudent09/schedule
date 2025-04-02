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
                        element.innerHTML = "Менеджмент";
                        break;
                    case "jur": 
                        element.innerHTML = "Юриспруденция";
                        break;
                    case "phr": 
                        element.innerHTML = "Фармация";
                        break;
                    case "bio": 
                        element.innerHTML = "Биотехнология";
                        break;
                }
            } else {
                const currentDate = new Date();
                const currentYear = currentDate.getFullYear();
                const currentMonth = currentDate.getMonth() + 1;

                const course = currentMonth <= 6 ? currentYear - value : currentYear - value + 1;
                element.innerHTML = course;
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
        } else {
        }
    });
}

function linkButton() {
    window.location.href = 'banner.html';
}

const animationContainer = document.getElementById('animation-container');

if (animationContainer) {
    fetch('assets/DuckEmojiProfile.json', { cache: 'default' })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(animationData => {
            lottie.loadAnimation({
                container: animationContainer,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: animationData
            });
        })
} else {
    Telegram.WebApp.showAlert('⚠️ Контейнер анимации не найден');
}