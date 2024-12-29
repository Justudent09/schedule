Telegram.WebApp.ready();

Telegram.WebApp.onEvent('themeChanged', function() {
    document.documentElement.className = Telegram.WebApp.colorScheme;
});

// Устанавливаем параметры Main Button
Telegram.WebApp.MainButton.setParams({ 
    text: 'Main Button'
});

// Обработчик клика
Telegram.WebApp.MainButton.onClick(function () {
    Telegram.WebApp.showAlert('Main Button was clicked');
});

Telegram.WebApp.MainButton.show();