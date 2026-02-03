# AlexPRO Lights — лендинг

Лендинг постоянного наружного освещения (Los Angeles). Заявки с формы уходят в **AmoCRM** (сделка + контакт) через API на Vercel.

## Локальный запуск

1. `npm install`
2. `npm run dev` — фронт на http://localhost:3000  
   Маршрут `/api/lead` работает только на Vercel (или при `vercel dev`). Чтобы проверить отправку в AmoCRM — деплой на Vercel или запуск `vercel dev`.

## Деплой на Vercel

- Сборка: `npm run build`, выход: `dist`. API: папка `api/` (serverless).
- В настройках проекта добавь переменные окружения для AmoCRM (см. [docs/AMOCRM_SETUP.md](docs/AMOCRM_SETUP.md)):
  - **AMOCRM_SUBDOMAIN** — поддомен AmoCRM
  - **AMOCRM_ACCESS_TOKEN** — токен доступа API
  - по желанию: `AMOCRM_PIPELINE_ID`, `AMOCRM_STATUS_ID`, `AMOCRM_FIELD_LEAD_NOTES`
