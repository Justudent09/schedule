Telegram.WebApp.ready();

Telegram.WebApp.onEvent('themeChanged', function() {
    document.documentElement.className = Telegram.WebApp.colorScheme;
});

// Устанавливаем параметры Main Button
Telegram.WebApp.MainButton.setParams({ 
    text: 'Main Button'
});

Telegram.WebApp.MainButton.show();

// Обработчик клика
Telegram.WebApp.MainButton.onClick(function () {
    Telegram.WebApp.showAlert('Main Button was clicked');
});

function toggleMainButton() {
    if (Telegram.WebApp.MainButton.isVisible) {
        Telegram.WebApp.MainButton.hide();
    } else {
        Telegram.WebApp.MainButton.show();
    }
};

