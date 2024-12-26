// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;

tg.expand(); // Разворачиваем Web App на весь экран

const submitButton = document.getElementById('submitButton');
const form = document.getElementById('userForm');

submitButton.addEventListener('click', () => {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const middleName = document.getElementById('middleName').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!firstName || !lastName || !phone) {
        tg.showAlert('Пожалуйста, заполните обязательные поля: Имя, Фамилия и Номер телефона.');
        return;
    }

    const userData = {
        first_name: firstName,
        last_name: lastName,
        middle_name: middleName,
        phone: phone,
    };

    // Отправка данных через Telegram API
    tg.sendData(JSON.stringify(userData));

    // Закрытие Web App
    tg.close();
});
