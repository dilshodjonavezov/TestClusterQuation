# Firebase Setup не требуется!

Приложение может работать в двух режимах:

## 1. Без Firebase (Локальное хранение)
- Данные сохраняются в `localStorage` браузера
- Идеально для тестирования
- Данные доступны только на текущем устройстве
- Никакой настройки не требуется!

## 2. С Firebase (Облачное хранение)

### Если вы хотите настроить Firebase для продакшена:

1. **Создайте Firebase проект**
   ```
   1. Перейдите на https://console.firebase.google.com/
   2. Нажмите "Add project" (Создать проект)
   3. Введите название: "Test Cluster Survey"
   4. Отключите Google Analytics (не обязательно)
   5. Нажмите "Create project"
   ```

2. **Добавьте веб-приложение**
   ```
   1. В консоли Firebase нажмите на иконку </> (Web)
   2. Введите название приложения: "Survey App"
   3. НЕ выбирайте "Firebase Hosting"
   4. Нажмите "Register app"
   5. СКОПИРУЙТЕ код конфигурации (firebaseConfig)
   ```

3. **Включите Firestore**
   ```
   1. В меню слева выберите "Firestore Database"
   2. Нажмите "Create database"
   3. Выберите режим "Start in test mode" (для начала)
   4. Выберите регион (europe-west) - ближайший к вам
   5. Нажмите "Enable"
   ```

4. **Настройте правила безопасности**
   
   В Firestore Database → Rules вставьте:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /surveys/{document} {
         allow create: if true;  // Любой может создавать
         allow read: if false;   // Никто не может читать
         allow update, delete: if false;  // Никто не может изменять
       }
     }
   }
   ```
   
   Для админ-панели с аутентификацией:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /surveys/{document} {
         allow create: if true;
         allow read, update, delete: if request.auth != null;
       }
     }
   }
   ```

5. **Обновите конфигурацию в коде**
   
   Откройте файл `js/config.js` и замените:
   ```javascript
   export const firebaseConfig = {
       apiKey: "AIzaSy...",  // Ваш API Key из шага 2
       authDomain: "test-cluster-survey.firebaseapp.com",
       projectId: "test-cluster-survey",
       storageBucket: "test-cluster-survey.appspot.com",
       messagingSenderId: "123456789",
       appId: "1:123456789:web:abc123"
   };
   ```

6. **Готово!** 
   - Теперь данные сохраняются в облаке Firebase
   - Доступ к данным через админ-панель
   - Данные видны на всех устройствах

---

## Для быстрого тестирования:

**НЕ НУЖНО настраивать Firebase!**

Просто откройте `index.html` в браузере, и приложение будет работать с localStorage.

---

## Стоимость Firebase

Firebase имеет щедрый бесплатный тарифный план:
- **Firestore**: 50,000 чтений/день, 20,000 записей/день БЕСПЛАТНО
- Для 200 ответов по 15 вопросов = ~3,000 записей
- **Вывод**: Полностью БЕСПЛАТНО для вашего проекта!

---

## Альтернатива Firebase: Supabase (PostgreSQL)

Если хотите использовать SQL вместо NoSQL:

1. Создайте проект на https://supabase.com/
2. Создайте таблицу `surveys`
3. Используйте Supabase JavaScript клиент

Но для простоты рекомендуем Firebase или просто localStorage!
