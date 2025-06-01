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
    "Полная информация о лайфхаках для зачётной недели. Здесь может быть подробный текст с советами от отличников, как эффективно подготовиться к экзаменам и успешно сдать все зачёты.",
    "**Киберспорт в вузе: CS2 соберёт лучших игроков**  

В нашем университете стартует масштабный киберспортивный турнир по **Counter-Strike 2**! Это не просто соревнование — это возможность для студентов проявить свои навыки, сразиться с сильнейшими командами и побороться за ценные призы.  

### 🔥 **Что вас ждёт?**  
- **Даты проведения**: 15–30 ноября 2023 года  
- **Формат**: 5 на 5, турнирная сетка с групповым этапом и плей-офф  
- **Призовой фонд**:  
  🥇 **1 место** – 50 000 ₽ + игровые девайсы от спонсоров  
  🥈 **2 место** – 30 000 ₽  
  🥉 **3 место** – 20 000 ₽  
  + дополнительные призы за MVP и лучшие моменты матчей  

### 🎮 **Условия участия**  
- Команда должна состоять из **студентов университета** (допускается 1 запасной игрок).  
- Регистрация открыта до **10 ноября** через официальный сайт турнира.  
- Обязательное присутствие на церемонии открытия и финала.  

### 🏆 **Почему стоит участвовать?**  
- **Опыт**: Возможность сыграть в условиях настоящего киберспортивного турнира.  
- **Нетворкинг**: Знакомство с единомышленниками и потенциальными тиммейтами.  
- **Шанс на развитие**: Лучшие игроки получат рекомендации для вступления в вузовскую киберспортивную лигу.  

### 📢 **Где смотреть?**  
Трансляции матчей будут проходить на **Twitch** и **YouTube** с профессиональными комментаторами. Финал турнира покажут в главном актовом зале университета!  

**Регистрируй команду, прокачивай скиллы и докажи, что именно ты достоин стать чемпионом!**  

🚀 *Готовы к легендарным клатчам? Время заявить о себе в CS2!*  

---  
*Организаторы: Киберспортивный клуб университета при поддержке деканата.*  
*По всем вопросам: [tournament@university.edu](mailto:tournament@university.edu)*",
    "Все новости о глобальном обновлении 47Par. Новые функции, исправления ошибок и улучшения производительности. Обновите приложение сейчас!"
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
const fullscreenText = document.getElementById('fullscreen-text');

scrollItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openFullscreen(index);
    });
});

function openFullscreen(index) {
    fullscreenText.textContent = fullDetails[index];
            
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