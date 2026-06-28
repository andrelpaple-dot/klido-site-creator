<?php
// public/api/config.php — единственный источник настроек бэкенда Klido.
// Все PHP-эндпоинты должны начинаться с:
//   require_once __DIR__ . '/config.php'; cors();

// =====================================================================
// База данных (MySQL на reg.ru)
// =====================================================================
define('DB_HOST', 'localhost');
define('DB_NAME', 'klido_db');
define('DB_USER', 'klido_user');
define('DB_PASS', 'CHANGE_ME');
define('DB_CHARSET', 'utf8mb4');

// =====================================================================
// Telegram Bot (для уведомлений о новых заявках)
// =====================================================================
define('TELEGRAM_BOT_TOKEN', 'CHANGE_ME');     // 123456:ABC-DEF...
define('TELEGRAM_CHAT_ID',   'CHANGE_ME');     // -100... или ID пользователя

// =====================================================================
// Админка (PHP-сессии)
// =====================================================================
define('ADMIN_LOGIN',    'admin');
define('ADMIN_PASSWORD', 'CHANGE_ME_STRONG_PASSWORD'); // в проде заменить

// =====================================================================
// Контакты / домен / пути
// =====================================================================
define('CONTACT_EMAIL', 'hello@klido.ru');
define('SITE_DOMAIN',   'https://klido.ru');
define('UPLOADS_DIR',   __DIR__ . '/../uploads/');
define('UPLOADS_URL',   '/uploads/');

// =====================================================================
// CORS: продакшен-домен + localhost для разработки
// =====================================================================
const ALLOWED_ORIGINS = [
    'https://klido.ru',
    'https://www.klido.ru',
    'http://localhost:5173',
    'http://localhost:8080',
];

function cors(): void {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (in_array($origin, ALLOWED_ORIGINS, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
    }
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    header('Access-Control-Allow-Credentials: true');
    header('Content-Type: application/json; charset=utf-8');
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

// =====================================================================
// Обработчики ошибок — всегда отдаём JSON, никогда HTML
// =====================================================================
ini_set('display_errors', '0');
ini_set('log_errors', '1');
error_reporting(E_ALL);

set_error_handler(function ($severity, $message, $file, $line) {
    if (!(error_reporting() & $severity)) return false;
    throw new ErrorException($message, 0, $severity, $file, $line);
});

set_exception_handler(function (Throwable $e) {
    if (!headers_sent()) {
        http_response_code(500);
        header('Content-Type: application/json; charset=utf-8');
    }
    error_log('[klido] ' . $e->getMessage() . ' @ ' . $e->getFile() . ':' . $e->getLine());
    echo json_encode(['ok' => false, 'error' => 'server error'], JSON_UNESCAPED_UNICODE);
    exit;
});

register_shutdown_function(function () {
    $err = error_get_last();
    if ($err && in_array($err['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR], true)) {
        if (!headers_sent()) {
            http_response_code(500);
            header('Content-Type: application/json; charset=utf-8');
        }
        echo json_encode(['ok' => false, 'error' => 'fatal'], JSON_UNESCAPED_UNICODE);
    }
});

// =====================================================================
// DB / helpers
// =====================================================================
function db(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = sprintf('mysql:host=%s;dbname=%s;charset=%s', DB_HOST, DB_NAME, DB_CHARSET);
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
    }
    return $pdo;
}

function json_ok($data = null): void {
    echo json_encode(['ok' => true, 'data' => $data], JSON_UNESCAPED_UNICODE);
    exit;
}

function json_err(string $msg, int $code = 400): void {
    http_response_code($code);
    echo json_encode(['ok' => false, 'error' => $msg], JSON_UNESCAPED_UNICODE);
    exit;
}

function tg_notify(string $text): void {
    if (TELEGRAM_BOT_TOKEN === 'CHANGE_ME' || TELEGRAM_CHAT_ID === 'CHANGE_ME') return;
    $url = 'https://api.telegram.org/bot' . TELEGRAM_BOT_TOKEN . '/sendMessage';
    $payload = http_build_query([
        'chat_id'    => TELEGRAM_CHAT_ID,
        'text'       => $text,
        'parse_mode' => 'HTML',
    ]);
    $ctx = stream_context_create(['http' => [
        'method'        => 'POST',
        'header'        => "Content-Type: application/x-www-form-urlencoded\r\n",
        'content'       => $payload,
        'timeout'       => 4,
        'ignore_errors' => true,
    ]]);
    @file_get_contents($url, false, $ctx);
}

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
