if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.expand();
    Telegram.WebApp.lockOrientation();
    Telegram.WebApp.SettingsButton.show();
    Telegram.WebApp.BackButton.hide();
}

Telegram.WebApp.SettingsButton.onClick(function(){ 
    window.location.href = 'setting.html'; 
});

const animations = [
    'assets/DuckEmojiPodcast.json',
    'assets/DuckEmojiGaming.json',
    'assets/DuckEmojiUpdate.json'
];

const fullDetails = [
    `Полная информация о лайфхаках для зачётной недели. Здесь может быть подробный текст с советами от отличников, как эффективно подготовиться к экзаменам и успешно сдать все зачёты.`,
    `<b>Киберспорт в вузе: CS2 соберёт лучших игроков</b>

<br><br>
В нашем университете стартует масштабный киберспортивный турнир по <b>Counter-Strike 2</b>! Это не просто соревнование — это возможность для студентов проявить свои навыки, сразиться с сильнейшими командами и побороться за ценные призы.

<br><br>
<b>🔥 Что вас ждёт?</b>
<ul>
  <li><b>Даты проведения</b>: 15–30 ноября 2023 года</li>
  <li><b>Формат</b>: 5 на 5, турнирная сетка с групповым этапом и плей-офф</li>
  <li><b>Призовой фонд</b>:
    <ul>
      <li>🥇 <b>1 место</b> – 50 000 ₽ + игровые девайсы от спонсоров</li>
      <li>🥈 <b>2 место</b> – 30 000 ₽</li>
      <li>🥉 <b>3 место</b> – 20 000 ₽</li>
    </ul>
    + дополнительные призы за MVP и лучшие моменты матчей
  </li>
</ul>

<br>
<b>🎮 Условия участия</b>
<ul>
  <li>Команда должна состоять из <b>студентов университета</b> (допускается 1 запасной игрок).</li>
  <li>Регистрация открыта до <b>10 ноября</b> через официальный сайт турнира.</li>
  <li>Обязательное присутствие на церемонии открытия и финала.</li>
</ul>

<br>
<b>🏆 Почему стоит участвовать?</b>
<ul>
  <li><b>Опыт</b>: Возможность сыграть в условиях настоящего киберспортивного турнира.</li>
  <li><b>Нетворкинг</b>: Знакомство с единомышленниками и потенциальными тиммейтами.</li>
  <li><b>Шанс на развитие</b>: Лучшие игроки получат рекомендации для вступления в вузовскую киберспортивную лигу.</li>
</ul>

<br>
<b>📢 Где смотреть?</b><br>
Трансляции матчей будут проходить на <b>Twitch</b> и <b>YouTube</b> с профессиональными комментаторами. Финал турнира покажут в главном актовом зале университета!

<br><br>
<b>Регистрируй команду, прокачивай скиллы и докажи, что именно ты достоин стать чемпионом!</b>

<br><br>
🚀 <i>Готовы к легендарным клатчам? Время заявить о себе в CS2!</i>

<br><br>
<hr>`,
    `Все новости о глобальном обновлении 47Par. Новые функции, исправления ошибок и улучшения производительности. Обновите приложение сейчас!`
];
    
animations.forEach((animationUrl, index) => {
    const containerId = `animation-container-${index + 1}`;
    const animationContainer = document.getElementById(containerId);
      
    if (animationContainer) {
        fetch(animationUrl, { cache: 'default' })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
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
        .catch(error => {
            console.error(`Ошибка загрузки анимации ${index + 1}:`, error);
        });
    } else {
        console.warn(`Контейнер ${containerId} не найден`);
    }
});

const scrollContainer = document.getElementById('horizontal-scroll');
const scrollItems = document.querySelectorAll('.scroll-item');
const buttons = document.querySelectorAll('#app .button');

if (scrollContainer) {
    scrollContainer.addEventListener('scroll', () => {
        const containerWidth = scrollContainer.offsetWidth;
        const scrollLeft = scrollContainer.scrollLeft;
        const index = Math.round(scrollLeft / containerWidth);

        scrollItems.forEach((item, i) => item.classList.toggle('active', i === index));
        buttons.forEach((button, i) => button.classList.toggle('active', i === index));
    });
} else {
    Telegram.WebApp.showAlert('⚠️ Контейнер прокрутки не найден');
}

const fullscreenOverlay = document.getElementById('fullscreen-overlay');
const fullscreenContent = document.getElementById('fullscreen-content');
const fullscreenAnimation = document.getElementById('fullscreen-animation');

scrollItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openFullscreen(index);
    });
});

function openFullscreen(index) {
    document.getElementById('fullscreen-text').innerHTML = fullDetails[index];
            
    fetch(animations[index], { cache: 'default' })
        .then(response => response.json())
        .then(animationData => {
            fullscreenAnimation.innerHTML = '';
                lottie.loadAnimation({
                    container: fullscreenAnimation,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    animationData: animationData
                });
            });
    
    fullscreenOverlay.classList.add('show');
    setTimeout(() => {
        fullscreenContent.classList.add('show');
    }, 10);
}

fullscreenOverlay.addEventListener('click', (e) => {
    if (e.target === fullscreenOverlay) {
        closeFullscreen();
    }
});

function closeFullscreen() {
    fullscreenContent.classList.remove('show');
    fullscreenOverlay.classList.remove('show');
}