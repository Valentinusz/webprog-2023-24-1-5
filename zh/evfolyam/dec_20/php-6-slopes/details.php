<?php

require_once 'SlopeStorage.php';

// ha nincs megadva mit akarunk megnézni átirányítás
if (!isset($_GET['id'])) {
    header('Location: index.php');
    exit();
}

$storage = new SlopeStorage();
$slope = $storage->findById($_GET['id']);

// ha nem létezik a megadott átirányítás
if (!$slope) {
    header('Location: index.php');
    exit();
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task 6</title>
    <link rel="stylesheet" href="src/index.css">
</head>
<body>
    <h1><?= $slope['name'] ?></h1>

    <div>Hossz / Length: <?= $slope['length'] ?> m</div>
    <div>Szín / Color: <?= $slope['color'] ?></div>
    <div>Veszélyek / Dangers:
        <ul>
            <?php foreach($slope['dangers'] as $danger): ?>
                <li><?= $danger ?></li>
            <?php endforeach; ?>
        </ul>
    </div>
</body>
</html>