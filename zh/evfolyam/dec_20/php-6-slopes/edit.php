<?php

require_once 'SlopeStorage.php';

// ha nincs megadva mit módosítsunk átirányítás
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
    <h1>Szerkesztés / Edit</h1>
    <form action="q_edit.php" method="post">
        <input type="hidden" name="id" value="<?= $slope['id'] ?>">

        <label for="name">Név / Name</label>
        <input type="text" name="name" id="name" value="<?= $slope['name'] ?>">

        <label for="length">Hossz (m) / Length (m)</label>
        <input type="number" name="length" id="length" value="<?= $slope['length'] ?>">

        <label for="color">Szín / Color</label>


        
        <select name="color" id="color">
            <?php
            // ezt kiemeltem hogy könnyebb legyen eldönteni melyik van bepipálva
            $colors = [
                'green' => "Zöld / Green",
                'blue' => "Kék / Blue",
                'red' => "Piros / Red",
                'black' => "Fekete / Black"
            ];
            ?>
            <?php foreach($colors as $color => $label): ?>
                <!-- selected: melyik option van kiválasztva -->
                <option value="<?= $color ?>" <?php if($slope['color'] === $color): ?> selected <?php endif; ?>>
                <?= $label ?></option>
            <?php endforeach; ?>
        </select>

        <label for="danger">Veszélyek / Dangers</label>
        <?php
            // itt ugyan azt a kiemelést csinálom mint az előbb
            $dangers = [
                'learners' => "Tanulók / Learners",
                'ice' => "Jég / Ice",
                'fog' => "Köd / Fog",
                'accident' => "Baleset / Accident"
            ];
        ?>
        <?php foreach($dangers as $danger => $label): ?>
            <div>
                <!-- checked: be van-e pipálva -->
                <input type="checkbox"
                       name="danger[]"
                       id="danger-<?= $danger ?>"
                       value="<?= $danger ?>"
                       <?php if(in_array($danger, $slope['dangers'])): ?> checked <?php endif; ?>
                >
                <label for="danger-<?= $danger ?>"><?= $label ?></label>
            </div>
        <?php endforeach; ?>
        <input type="submit" value="💾">
    </form>
</body>

</html>