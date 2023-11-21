<?php

$shapes = [
    [
        'type' => 'rect',
        'params' => [
            'x' => 0,
            'y' => 0,
            'width' => 50,
            'height' => 50,
            'rx' => 10,
        ]
    ],
    [
        'type' => 'line',
        'params' => [
            'x1' => 60,
            'y1' => 100,
            'x2' => 80,
            'y2' => 120,
            'stroke' => 'red',
        ]
    ],
    [
        'type' => 'line',
        'params' => [
            'x1' => 80,
            'y1' => 120,
            'x2' => 150,
            'y2' => 50,
            'stroke' => 'red',
        ]
    ],
    [
        'type' => 'circle',
        'params' => [
            'cx' => 150,
            'cy' => 100,
            'r' => 20,
        ]
    ],
];

?>

<!DOCTYPE html>
<html lang='HU'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport'
          content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'>
    <meta http-equiv='X-UA-Compatible' content='ie=edge'>
    <title>SVG generátor</title>
</head>
<body>
<svg>
    <!-- Gonosz megoldás. Talán egy kicsit érthetőbb ha mondjuk switch-et használunk -->
    <?php foreach ($shapes as $shape): ?>
        <<?= $shape['type'] ?> <?php foreach ($shape['params'] as $key => $value): ?> <?= "$key=$value" ?> <?php endforeach; ?>/>
    <?php endforeach; ?>
</svg>
</body>
</html>
