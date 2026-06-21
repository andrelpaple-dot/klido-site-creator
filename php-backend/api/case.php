<?php
require_once __DIR__ . '/config.php';
cors();

$slug = trim((string)($_GET['slug'] ?? ''));
if ($slug === '') json_err('slug required');

try {
    $pdo = db();
    $cs = $pdo->prepare("SELECT * FROM cases WHERE slug = ? AND is_published = 1 LIMIT 1");
    $cs->execute([$slug]);
    $case = $cs->fetch();
    if (!$case) json_err('not found', 404);

    $rs = $pdo->prepare(
        "SELECT metric, before_value, after_value, icon, sort_order
           FROM case_results
          WHERE case_id = ?
          ORDER BY sort_order ASC, id ASC"
    );
    $rs->execute([(int)$case['id']]);
    $case['results'] = $rs->fetchAll();

    json_ok($case);
} catch (Throwable $e) {
    json_err('db error', 500);
}
