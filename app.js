Telegram.WebApp.ready();

Telegram.WebApp.onEvent('themeChanged', function() {
    document.documentElement.className = Telegram.WebApp.colorScheme;
});

Telegram.WebApp.MainButton.setParams({ 
    text: 'Кнопка' 
});

Telegram.WebApp.MainButton.onClick(function () {
    Telegram.WebApp.showAlert('Main Button was clicked')
});	

Telegram.WebApp.MainButton.show();