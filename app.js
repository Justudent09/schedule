Telegram.WebApp.ready();

Telegram.WebApp.onEvent('themeChanged', function() {
    document.documentElement.className = Telegram.WebApp.colorScheme;
});