Telegram.WebApp.ready();
Telegram.WebApp.MainButton.hide();

Telegram.WebApp.onEvent('themeChanged', function() {
    document.documentElement.className = Telegram.WebApp.colorScheme;
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('DuckEmoji.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при загрузке файла: ' + response.statusText);
            }
            return response.json(); 
        })
        .then(animationData => {
            lottie.loadAnimation({
                container: document.getElementById('animation-container'),
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: animationData 
            });
        })
        .catch(error => {
            console.error('Ошибка при загрузке анимации:', error);
        });
});

document.addEventListener('DOMContentLoaded', () => {
      const scrollContainer = document.getElementById('horizontal-scroll');
      const scrollItems = document.querySelectorAll('.scroll-item');
      const buttons = document.querySelectorAll('#app .button');

      // Обновляем активный индикатор при прокрутке
      scrollContainer.addEventListener('scroll', () => {
        const containerWidth = scrollContainer.offsetWidth;
        const scrollLeft = scrollContainer.scrollLeft;
        const index = Math.round(scrollLeft / containerWidth);

        // Обновляем активный элемент
        scrollItems.forEach((item, i) => {
          item.classList.toggle('active', i === index);
        });

        // Обновляем активную кнопку пагинации
        buttons.forEach((button, i) => {
          button.classList.toggle('active', i === index);
        });
      });
    });

