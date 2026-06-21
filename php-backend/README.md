# PHP backend для Klido (для shared-хостинга reg.ru)

Эти файлы **не исполняются** в Lovable-превью (здесь нет PHP/MySQL).
Это артефакты для ручной заливки на reg.ru.

## Деплой

1. `npm run build` — собрать фронтенд в `dist/`
2. Скопировать содержимое этой папки `php-backend/` поверх `dist/`:
   - `api/*` → `dist/api/`
   - `uploads/.htaccess` → `dist/uploads/.htaccess`
   - `.htaccess` → `dist/.htaccess` (SPA-роутинг)
   - `database.sql` → `dist/database.sql`
3. Залить `dist/` в корень домена на reg.ru
4. Импортировать `database.sql` через phpMyAdmin
5. Открыть `api/config.php` и заполнить DB-доступы

## Структура

```
dist/
├── index.html
├── assets/
├── api/
│   ├── config.php
│   ├── cases.php       # GET список кейсов
│   ├── case.php        # GET кейс по ?slug=
│   └── lead.php        # POST форма заявки
├── uploads/.htaccess   # запрет PHP в /uploads
├── .htaccess           # SPA-роутинг
└── database.sql
```

> Кейсы на сайте сейчас статические (вшиты в React). PHP-эндпоинты — задел
> на случай, если позже захотите вынести кейсы в БД.
