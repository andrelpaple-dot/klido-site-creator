<?php
require_once __DIR__ . '/config.php';
cors();

try {
    $stmt = db()->query(
        "SELECT id, slug, title, short_description, niche, category,
                preview_image, full_image, tags, sort_order
           FROM cases
          WHERE is_published = 1
          ORDER BY sort_order ASC, id DESC"
    );
    json_ok($stmt->fetchAll());
} catch (Throwable $e) {
    json_err('db error', 500);
}
