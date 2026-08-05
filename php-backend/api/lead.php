<?php
require_once __DIR__ . '/config.php';
cors();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') json_err('method not allowed', 405);

$raw = file_get_contents('php://input');
$in  = json_decode($raw, true) ?: $_POST;

$name    = trim((string)($in['name']    ?? ''));
$contact = trim((string)($in['contact'] ?? ''));
$message = trim((string)($in['message'] ?? ''));
$source  = trim((string)($in['source']  ?? ''));

if ($contact === '' || mb_strlen($contact) > 255) json_err('contact required');
if (mb_strlen($name) > 255 || mb_strlen($source) > 255) json_err('too long');
if (mb_strlen($message) > 4000) json_err('message too long');

try {
    $stmt = db()->prepare(
        "INSERT INTO leads (name, contact, message, source_page) VALUES (?, ?, ?, ?)"
    );
    $stmt->execute([$name, $contact, $message, $source]);
    $id = (int)db()->lastInsertId();

    // Telegram-уведомление
    $tgText = "<b>Klido: новая заявка #{$id}</b>\n"
        . "Имя: " . htmlspecialchars($name ?: '—') . "\n"
        . "Контакт: " . htmlspecialchars($contact) . "\n"
        . "Сообщение: " . htmlspecialchars($message ?: '—') . "\n"
        . "Страница: " . htmlspecialchars($source ?: '—');
    tg_notify($tgText);

    // Email removal requested, so we keep only Telegram or silent failure for mail() if used for logging only
    /*
    @mail(CONTACT_EMAIL, 'Klido: новая заявка',
        "Имя: $name\nКонтакт: $contact\nСообщение: $message\nСтраница: $source",
        "From: Klido <noreply@klido.ru>\r\nContent-Type: text/plain; charset=utf-8"
    );
    */

    json_ok(['id' => $id]);
} catch (Throwable $e) {
    json_err('db error', 500);
}
