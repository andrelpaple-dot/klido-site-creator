# Klido — деплой на reg.ru (shared-хостинг)

Бэкенд: PHP 8.1 + MySQL 8 на серверах в РФ (ФЗ-152).
Никаких Supabase/Firebase/Vercel/Netlify/Lambda — всё своё.

## Структура

```
php-backend/
├── api/
│   ├── config.php       # ЕДИНСТВЕННЫЙ источник настроек (DB, Telegram, CORS, админка)
│   ├── cases.php        # GET /api/cases.php — список кейсов
│   ├── case.php         # GET /api/case.php?slug=... — один кейс
│   └── lead.php         # POST /api/lead.php — приём заявок (+ Telegram + email)
├── uploads/.htaccess    # Запрет PHP в /uploads/
├── .htaccess            # SPA-роутинг + кеш + security headers
├── database.sql         # Полная схема (utf8mb4, InnoDB, индексы)
└── README.md
```

## Шаги деплоя

1. **Статическая сборка (всё в одной команде)**
   ```bash
   npm install
   npm run build
   ```
   Скрипт делает всё сам:
   - собирает SPA в `dist/` (без SSR/Cloudflare),
   - скачивает все картинки кейсов и логотипы с `klido-site-creator.lovable.app`
     и зашивает их в `dist/assets/` с хешированными именами,
   - копирует `api/`, `uploads/`, `.htaccess`, `database.sql` из `php-backend/`
     в `dist/`.

   На выходе — папка `dist/`, готовая для заливки.

2. **Заливка на reg.ru**
   Содержимое `dist/` целиком — в корень домена (`/www/Klido.ru/` или
   `public_html/`) через FTP / файловый менеджер ISPmanager. Структура:
   ```
   /www/Klido.ru/
   ├── api/            (PHP-эндпоинты)
   ├── assets/         (хешированные JS/CSS/картинки)
   ├── uploads/
   ├── .htaccess       (SPA-роутинг + кеш)
   ├── index.html      (точка входа SPA)
   └── database.sql
   ```

4. **База данных** (если используете формы/лиды)
   - В phpMyAdmin создать БД `klido_db` + пользователя.
   - Импортировать `database.sql` один раз.
   - После импорта `database.sql` с сервера можно удалить.

5. **Настройки** — открыть `api/config.php` и заполнить:
   - `DB_HOST / DB_NAME / DB_USER / DB_PASS`
   - `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
   - `ADMIN_LOGIN`, `ADMIN_PASSWORD`
   - При необходимости — добавить домен в `ALLOWED_ORIGINS`.

## Что уже сделано в коде

- Утилита `src/lib/phpApi.ts` парсит ответы через `text()` + `JSON.parse`,
  чтобы PHP-ошибки (HTML) не крашили фронт.
- `api/config.php` отдаёт JSON на любой PHP-warning/fatal (`set_error_handler`,
  `set_exception_handler`, `register_shutdown_function`).
- CORS поддерживает GET/POST/PUT/DELETE/OPTIONS, прод-домен + localhost.
- `.htaccess` в корне: SPA-fallback на `index.html` для всех маршрутов,
  кроме `/api/` и `/uploads/`. Кеш статики на год. Security headers.
- `uploads/.htaccess`: запрет исполнения PHP/CGI в загрузках.
- Никаких зависимостей на Supabase, Firebase, Vercel, Netlify в `package.json`.

## Чек-лист (выполнено)

- [x] В `package.json` и коде нет `supabase` / `firebase`.
- [x] Нет папок `supabase/`, `netlify/`, файла `vercel.json`.
- [x] Все серверные эндпоинты — `public/api/*.php`.
- [x] Авторизация админки — через PHP-сессии (`session_start()` в `config.php`).
- [x] Загрузки — `/uploads/` с запретом PHP.
- [x] Telegram-уведомления через Bot API.

> Сейчас лендинг полностью статический — кейсы вшиты в React.
> PHP-эндпоинты `cases.php` / `case.php` — задел на будущее (если решите
> вынести кейсы в БД). Активно используется только `lead.php`.
