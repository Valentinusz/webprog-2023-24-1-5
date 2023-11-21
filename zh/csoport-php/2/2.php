<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    var_dump($_POST);
    $errors = [];

    $name = trim($_POST['tanulo'] ?? '');
    if (strlen($name) === 0) {
        $errors['tanulo'] = 'A tanuló nevének megadása kötelező.';
    } else {
        if (count(explode(' ', $name)) < 2) {
            $errors['tanulo'] = 'A tanuló neve legalább két szóból kell álljon.';
        }
    }

    $score = trim($_POST['szazalek'] ?? '');
    if (strlen($score) === 0) {
        $errors['szazalek'] = 'Az elért százalékos eredmény megadása kötelező.';
    } else {
        if (!filter_var($score, FILTER_VALIDATE_INT)) {
            $errors['szazalek'] = 'Az elért százalékos eredmény egész szám kell legyen.';
        } else {
            $score = intval($score);

            if ($score < 0) {
                $errors['szazalek'] = 'Az elért százalékos eredmény nemnegatív kell legyen.';
            } else {
                // checkbox csak akkor megy át ha be van pipálva
                if (12 <= $score && $score < 25 && (!isset($_POST['szobeli']) || $_POST['szobeli'] !== 'on')) {
                    $errors['szobeli'] = 'Szóbeli időpontot kell foglalni.';
                }
            }
        }
    }
}

?>

<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>PHP ZH - 2. feladat</title>
</head>
<body>
    <h1>ÉRETTSÉGI VIZSGA MATEMATIKÁBÓL</h1> 
    <h2>2. feladat: űrlapfeldolgozás</h2>
    <form action="2.php" method="POST" novalidate>
        <label for="tanulo">Tanuló neve:</label>
        <input type="text" name="tanulo" id="tanulo" value="<?= $name ?? '' ?>">
        <?php if(isset($errors['tanulo'])): ?> <span><?= $errors['tanulo'] ?></span><?php endif; ?>
        <br>
        <label for="szazalek">Eredmény (%):</label>
        <input type="text" name="szazalek" id="szazalek" value="<?= $score ?? '' ?>">
        <?php if(isset($errors['szazalek'])): ?> <span><?= $errors['szazalek'] ?></span><?php endif; ?>
        <br>
        <input type="checkbox" name="szobeli" id="szobeli" <?= isset($_POST['szobeli']) ? 'checked' : '' ?>>
        <label for="szobeli">Szóbeli időpont szükséges</label>
        <?php if(isset($errors['szobeli'])): ?> <span><?= $errors['szobeli'] ?></span><?php endif; ?>
        <br>
        <button type="submit">Küldés</button>
    </form>
</body>
</html>