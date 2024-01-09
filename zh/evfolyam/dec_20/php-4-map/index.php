<?php
// PHP dev szerver indítása egy adott mappában pl. php -S localhost:8000
// fájl behúzása (fizikálisan)
require_once "data.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task 4</title>
    <link rel="stylesheet" href="src/index.css">
</head>
<body>
    <h1><?= $title_hun ?></h1>
    <ul>
        <!-- HTML-be ágyazott PHP ciklus -->
        <!-- resorts_assoc asszociatív tömb -->
        <?php foreach($resorts_assoc as $resort): ?>
            <li data-id="<?= $resort['id'] ?>"><?= $resort['city'] ?> (<?= $resort['height'] ?> m)</li>
        <?php endforeach; ?>
    </ul>
    <div>
        <svg id="map" width="1040" height="658">
            <image xlink:href="src/alpes10.gif" x="0" y="0" height="658px" width="1040px"/>
            <?php foreach($resorts_assoc as $resort): ?>
                <circle
                    cx="<?= $resort['cx'] ?>"
                    cy="<?= $resort['cy'] ?>"
                    fill="<?= $colors[$resort['country']] ?>"
                    r="<?= 10 * ($resort['height'] / 1000) ?>"
                    data-id="<?= $resort['id'] ?>"
                />
                <text
                    x="<?= $resort['cx'] ?>"
                    y="<?= $resort['cy'] - 20 ?>"
                    fill="<?= $colors[$resort['country']] ?>"
                    data-id="<?= $resort['id'] ?>"

                    font-size="15"
                    text-anchor="middle"
                    alignment-baseline="middle"
                    font-weight="bold"
                ><?= $resort['city'] ?></text>
            <?php endforeach; ?>
        </svg>
    </div>
    

    <script src="src/script.js"></script> <!-- Ebben nem kell semmit sem csinálnod! / You don't have to do anything in this. -->
</body>
</html>