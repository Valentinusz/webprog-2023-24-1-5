<?php

$torzslapok = json_decode(file_get_contents('vizsgazok.json'), true);

if ($change = isset($_GET['lap_szam']) && array_key_exists($_GET['lap_szam'], $torzslapok)) {
    $torzslapok[$_GET['lap_szam']] = true;
    file_put_contents('vizsgazok.json', json_encode($torzslapok, JSON_PRETTY_PRINT));
}

// asszociatív tömb esetén alapból az értéket adja át
$konyvelt = array_filter($torzslapok, fn($value) => $value);

// array diff minden olyan elemi nincs a megadott tömb(ök)ben
$hianyzo = array_diff($torzslapok, $konyvelt);

file_put_contents('statisztika.txt',
              round(count($konyvelt) / count($torzslapok) * 100, 2) . "%"
);
?>

<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>PHP ZH - 3. feladat</title>
</head>
<body>
<h1>ÉRETTSÉGI VIZSGA MATEMATIKÁBÓL</h1>
<h2>3. feladat: adattárolás</h2>
<h3>Könyvelt törzslapok</h3>
<ul>
    <?php foreach ($konyvelt as $lap => $kitoltve): ?>
        <li><?= $lap ?></li>
    <?php endforeach; ?>
</ul>

<h3>Hiányos törzslapok</h3>
<ul>
    <?php foreach ($hianyzo as $lap => $kitoltve): ?>
        <li><a href='3.php?lap_szam=<?= $lap ?>'><?= $lap ?></a></li>
    <?php endforeach; ?>
</ul>

</body>
</html>