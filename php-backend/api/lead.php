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

try {
    $stmt = db()->prepare(
        "INSERT INTO leads (name, contact, message, source_page) VALUES (?, ?, ?, ?)"
    );
    $stmt->execute([$name, $contact, $message, $source]);

    // Опционально: уведомление на email
    @mail(CONTACT_EMAIL, 'Klido: новая заявка',
        "Имя: $name\nКонтакт: $contact\nСообщение: $message\nСтраница: $source",
        "From: Klido <noreply@klido.ru>\r\nContent-Type: text/plain; charset=utf-8"
    );

    json_ok(['id' => (int)db()->lastInsertId()]);
} catch (Throwable $e) {
    json_err('db error', 500);
}
