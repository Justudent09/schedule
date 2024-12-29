Telegram.WebApp.ready();

Telegram.WebApp.onEvent('themeChanged', function() {
    document.documentElement.className = Telegram.WebApp.colorScheme;
});

Telegram.WebApp.MainButton.setParams({ 
    text: 'Кнопка' 
});