# Заявки с лендинга в Google Sheets

## Шаг 1. Создай таблицу

1. Открой [Google Sheets](https://sheets.google.com) и создай новую таблицу (или открой существующую).
2. В первой строке добавь заголовки колонок (можно один раз вручную, скрипт добавит их при первом запуске, если лист пустой):

   | Дата и время | Адрес | Телефон | Способ связи | Покрытие | Высота дома | Основное использование | Заметки | Email |
   |--------------|-------|---------|--------------|----------|-------------|------------------------|---------|-------|

   Или оставь лист пустым — скрипт ниже сам запишет заголовки при первой заявке.

3. Запомни название таблицы (например «Заявки AlexPRO Lights»).

---

## Шаг 2. Apps Script — принять заявки и писать в таблицу

1. В этой же таблице: **Расширения** → **Apps Script**.
2. Удали весь код в редакторе и вставь **целиком** код ниже.
3. Нажми **Сохранить** (дискета), назови проект, например `Landing to Sheet`.

```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Дата и время', 'Адрес', 'Телефон', 'Способ связи', 'Покрытие',
        'Высота дома', 'Основное использование', 'Заметки', 'Email'
      ]);
    }

    sheet.appendRow([
      new Date().toLocaleString('ru-RU'),
      data.address || '',
      data.phone || '',
      data.contactMethod === 'call' ? 'Звонок' : 'WhatsApp',
      data.coverage || '',
      data.homeHeight || '',
      data.mainUse || '',
      data.notes || '',
      data.email || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. **Развернуть**:
   - Нажми **Развернуть** → **Новое развертывание**.
   - Тип: **Веб-приложение**.
   - **Описание:** например `Приём заявок`.
   - **Выполнять от имени:** **Я** (твой аккаунт).
   - **У кого есть доступ:** **Все пользователи** (иначе лендинг не сможет отправлять запросы).
   - Нажми **Развернуть**.
5. В появившемся окне скопируй **URL веб-приложения** (например `https://script.google.com/macros/s/xxxxx/exec`).  
   Этот URL нужен для следующего шага.

---

## Шаг 3. Подставить URL в проект

В папке проекта создай или отредактируй файл **`.env.local`** (он не попадает в git) и добавь строку:

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/ТВОЙ_ID/exec
```

Вместо `https://script.google.com/macros/s/ТВОЙ_ID/exec` вставь **свой** URL из шага 2.

Перезапусти dev-сервер (`npm run dev`), если он был запущен.

---

## Деплой (Vercel / GitHub Pages)

- **Vercel:** в настройках проекта добавь переменную окружения **VITE_GOOGLE_SCRIPT_URL** (URL веб-приложения из шага 2).
- **GitHub Pages (Actions):** в репозитории **Settings** → **Secrets and variables** → **Actions** → секрет **VITE_GOOGLE_SCRIPT_URL** с тем же URL.
