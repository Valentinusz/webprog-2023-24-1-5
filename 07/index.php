<?php
$errors = ['A', 'B', 'C', 'D', 'E'];
$categories = [5 => "Akció", 4 => "Dráma", 8 => "Vígjáték"];
$products = [23 => "Pendrive", 15 => "HDD", 12 => "SSD", 9 => "RAM"];

class Question {
}

$questions = [
//        5 => new Question('Első kérdés szövege.', ['A', 'B', 'C'], [2]),
//        6 => new Question('Második kérdés szövege.', ['A', 'B', 'C', 'D'], [0, 1])
];

$students = [
    ["name" => "Peter Kovacs", "neptun" => "ABC123", "birth_year" => 1990, "gender" => "Male"],
    ["name" => "Anna Toth", "neptun" => "DEF456", "birth_year" => 1985, "gender" => "Female"],
    ["name" => "Gabor Nagy", "neptun" => "GHI789", "birth_year" => 1972, "gender" => "Male"],
    ["name" => "Emese Kiss", "neptun" => "JKL012", "birth_year" => 1995, "gender" => "Female"],
    ["name" => "Adam Szabo", "neptun" => "MNO345", "birth_year" => 1998, "gender" => "Male"],
];


function fact(int $num): int {
    if ($num < 0) {
        return 0;
    }

    $prod = 1;
    for ($i = 2; $i <= $num; $i++) {
        $prod *= $i;
    }
    return $prod;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Webprogramozás 7. gyakorlat</title>
</head>
<body>
<h1>Webprogramozás 7. gyakorlat</h1>

<div>
    <h2>Első feladat</h2>
    <h3><?php echo "Helló!" ?></h3>
    <h3><?= "Helló!" ?></h3>
</div>

<div>
    <h2>Második feladat</h2>
</div>

<div>
    <h2>Harmadik feladat</h2>
    <?= fact(5) ?>
</div>

<div>
    <h2>Negyedik feladat</h2>
    <?php for ($i = 0; $i < 10; $i++): ?>
        <h3 style='font-size: <?= 1 + $i * 0.25 ?>rem'><?= $i ?></h3>
    <?php endfor; ?>
</div>

<div>
    <h2>Ötödik feladat</h2>
    <ol>
    <?php foreach ($errors as $error): ?>
        <li><?= $error ?></li>
    <?php endforeach; ?>
    </ol>
</div>

<div>
    <h2>Hatodik feladat</h2>
    <select>
    <?php foreach ($errors as $categoryId => $categoryName): ?>
        <option value='<?= $categoryId ?>'><?= $categoryName ?></option>
    <?php endforeach; ?>
    </select>
</div>

<div>
    <h2>Hetedik feladat</h2>
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
    <h2>Nyolcadik feladat</h2>
</div>
<div>
    <h2>Kilencedik feladat</h2>
    <?php if (count($students) === 0): ?>
        <p>Nincs diák</p>
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
                    <td><?= $student['birth_year'] ?></td>
                    <td><?= $student['gender'] ?></td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
    <?php endif; ?>


</div>
<div>
    <h2>Tizedik feladat</h2>
</div>
</body>
</html>
