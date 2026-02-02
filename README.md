# AlexPRO Lights — лендинг

Лендинг постоянного наружного освещения (Los Angeles). Заявки уходят в Google Sheets через Google Apps Script.

## Локальный запуск

1. `npm install`
2. Создай `.env.local` и добавь URL веб-приложения Apps Script (см. [docs/GOOGLE_SHEETS_SETUP.md](docs/GOOGLE_SHEETS_SETUP.md)):
   ```
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/.../exec
   ```
3. `npm run dev`

## Деплой на Vercel

- В настройках проекта Vercel добавь переменную окружения **VITE_GOOGLE_SCRIPT_URL** (URL веб-приложения Google Apps Script).
- Сборка: `npm run build`, выход: `dist`.
