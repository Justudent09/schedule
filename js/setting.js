if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.expand();
    Telegram.WebApp.lockOrientation();
    Telegram.WebApp.SettingsButton.hide();
    Telegram.WebApp.BackButton.show();
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
    fetch('assets/DuckEmojiStudent.json', { cache: 'default' })
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