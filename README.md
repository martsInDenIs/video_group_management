Щоб запустити застосунок:
    1. Створіть копію .env.example файлу, перейменуйте в .env та заповніть його своїми значеннями
    2. Для запуску локально, виконайте команду npm install && npm run migration:run && npm run build && npm start
    3. Для запуску в контейнері виконайте команду з кореня docker-compose up

Шляхи для покращення:
    1. Повністю перенести ролі в базу даних, додати permissions.
    2. Надати можливість змінювати та обирати роль тільки адміністраторам. Додати роль admin.
    3. Надати можливість автоматично оновлювати access token, за допомогою refresh token.
    4. Покрити код більшою кількістю тестувань
    5. За потреби додати індекси для швидшого пошуку сутностей. Додати кешування за допомогою Redis