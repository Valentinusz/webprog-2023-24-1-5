<?php
// először a basics.php-ba nézz be

# Sablonprogramozás
// PHP HTML-be ékelhető
// ezzel egy ún. sablon jön létre, melynek bizonyos részeire
//  értéket helyetessítünk
//  feltételesen generálunk le
//  ciklusban generálunk le
// feladatunk rájönni mely részek egyeznek meg és hol kell behelyettesíteni

/* <?php és ?> közé írtak php-ként kerülnek értelmezésre */
/* <?= ... ?> ugyan az mint <?php echo ... ?> */
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>7. gyakorlat</title>
</head>
<body>
<h1>7. gyakorlat</h1>

<div>
    <h2>1. feladat</h2>
    <?php $nev = "Bálint" ?>
    <?php echo "<h3>$nev</h3>" ?>
    <?= "<h3>$nev</h3>" ?>
    <!--  De igazából ennyi is elég. Mindig fontos azt azonosítani, hogy mi változik és mi nem.  -->
    <h3>Helló <?= $nev ?>!</h3>
</div>

<div>
    <h2>2. feladat</h2>
    <?= date("Y-m-d H:i:s"); ?>
</div>

<div>
    <h2>3. feladat</h2>
    <?php

    function factorial(int $n): int {
        if ($n < 2) {
            return 1;
        }

        return $n * factorial($n - 1);
    }

    ?>
    <div><?= factorial(1) ?></div>
    <div><?= factorial(2) ?></div>
    <div><?= factorial(3) ?></div>
    <div><?= factorial(4) ?></div>
    <div><?= factorial(5) ?></div>
</div>

<div>
    <h2>4. feladat</h2>
    <!-- Vezérlési szerkezeteket is tudunk közbeékelni. -->
    <?php for ($i = 0; $i < 10; $i++): ?>
        <h3 style='font-size: <?= 1 + $i * 0.25 ?>rem'>Helló világ!</h3>
    <?php endfor; ?>
</div>

<div>
    <h2>5. feladat</h2>
    <?php $errors = ['A', 'B', 'C', 'D', 'E']; ?>
    <ol>
        <?php foreach ($errors as $error): ?>
            <li><?= $error ?></li>
        <?php endforeach; ?>
    </ol>
</div>

<div>
    <h2>5. feladat</h2>
    <?php $categories = [5 => "Akció", 4 => "Dráma", 8 => "Vígjáték"]; ?>
    <select>
        <?php foreach ($categories as $id => $name): ?>
            <option value='<?= $id ?>'><?= $name ?></option>
        <?php endforeach; ?>
    </select>
</div>

<div>
    <h2>7. feladat</h2>
    <?php $products = [23 => "Pendrive", 15 => "HDD", 12 => "SSD", 9 => "RAM"]; ?>
    <form>
        <?php foreach($products as $productId => $productName): ?>
            <input id='<?= $productName ?>' type='checkbox' name='products' value='<?= $productId ?>'/>
            <label for='<?= $productName ?>'><?= $productName ?></label>
            <br>
        <?php endforeach; ?>
        <button>Buy</button>
    </form>

</div>

<div>
    <h2>8. feladat</h2>
    <?php

    $students = [
        ["name" => "Peter Kovacs", "neptun" => "ABC123", "birth_year" => 1990, "gender" => "Male"],
        ["name" => "Anna Toth", "neptun" => "DEF456", "birth_year" => 1985, "gender" => "Female"],
        ["name" => "Gabor Nagy", "neptun" => "GHI789", "birth_year" => 1972, "gender" => "Male"],
        ["name" => "Emese Kiss", "neptun" => "JKL012", "birth_year" => 1995, "gender" => "Female"],
        ["name" => "Adam Szabo", "neptun" => "MNO345", "birth_year" => 1998, "gender" => "Male"],
    ];

    ?>
    <?php if (count($students) === 0): ?>
        <div>Nincs tanuló!</div>
    <?php else: ?>
        <table>
            <thead>
            <tr>
                <th>Név</th>
                <th>Neptun</th>
                <th>Születés</th>
                <th>Nem</th>
            </tr>
            </thead>
            <tbody>
                <?php foreach ($students as $student): ?>
                    <tr>
                        <td><?= $student['name'] ?></td>
                        <td><?= $student['neptun'] ?></td>
                        <td><?= $student['birth_year']  ?></td>
                        <td><?= $student['gender'] ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php endif; ?>
</div>
</body>
</html>