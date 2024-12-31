Telegram.WebApp.ready();

Telegram.WebApp.MainButton.hide();

Telegram.WebApp.onEvent('themeChanged', function() {
    document.documentElement.className = Telegram.WebApp.colorScheme;
});

lottie.loadAnimation({
    container: document.getElementById('animation-container'),
    renderer: 'svg',
    loop: true, 
    autoplay: true,
    path: 'DuckEmoji.tgs'
});

