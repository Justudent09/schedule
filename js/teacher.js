if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.expand();
    Telegram.WebApp.lockOrientation();
    Telegram.WebApp.SettingsButton.hide();
    Telegram.WebApp.BackButton.show();
}

Telegram.WebApp.BackButton.onClick(function(){ 
    window.location.href = 'auth.html'; 
});

const animationContainer = document.getElementById('animation-container');

if (animationContainer) {
    fetch('assets/DuckEmojiDeadend.json', { cache: 'default' })
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