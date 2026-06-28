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

1. **Сборка фронтенда**
   ```bash
   npm install
   npm run build
   ```
   На выходе — папка `dist/` (статика Vite: `index.html` + `assets/`).

2. **Сборка пакета для заливки**
   Скопировать в `dist/` содержимое `php-backend/`:
   ```bash
   cp -r php-backend/api          dist/api
   cp -r php-backend/uploads      dist/uploads
   cp    php-backend/.htaccess    dist/.htaccess
   cp    php-backend/database.sql dist/database.sql
   ```

3. **Заливка на reg.ru**
   Содержимое `dist/` — в корень домена (обычно `public_html/` или `www/`)
   через FTP/SFTP/файловый менеджер ISPmanager.

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
