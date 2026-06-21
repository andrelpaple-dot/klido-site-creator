<?php
// public/api/config.php — единственный источник настроек

// --- DB ---
define('DB_HOST', 'localhost');
define('DB_NAME', 'klido_db');
define('DB_USER', 'klido_user');
define('DB_PASS', 'CHANGE_ME');
define('DB_CHARSET', 'utf8mb4');

// --- Контакты ---
define('CONTACT_EMAIL', 'hello@klido.ru');
define('TELEGRAM_URL', 'https://t.me/AndrewGeiger');

// --- CORS (для разработки; в проде можно сузить до своего домена) ---
function cors(): void {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Content-Type: application/json; charset=utf-8');
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

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

function json_ok($data): void {
    echo json_encode(['ok' => true, 'data' => $data], JSON_UNESCAPED_UNICODE);
    exit;
}

function json_err(string $msg, int $code = 400): void {
    http_response_code($code);
    echo json_encode(['ok' => false, 'error' => $msg], JSON_UNESCAPED_UNICODE);
    exit;
}

// Стартуем сессию (если когда-нибудь понадобится админка)
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
