<?php

require_once 'StudentStorage.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $errors = [];

    $name = trim($_POST['name'] ?? '');
    if (strlen($name) === 0) {
        $errors['name'] = 'A név megadása kötelező!';
    }

    $age = trim($_POST['age'] ?? '');
    if (strlen($age) === 0) {
        $errors['age'] = 'Az életkor megadása kötelező!';
    } else {
        if (!filter_var($age, FILTER_VALIDATE_INT)) {
            $errors['age'] = 'Az életkornak számnak kell lennie.';
        }
    }

    if (count($errors) === 0) {
        $students = new StudentStorage();

        $students->add(['name' => $name, 'age' => intval($age)]);
    }
}

?>

<!DOCTYPE html>
<html lang='hu'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport'
          content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'>
    <meta http-equiv='X-UA-Compatible' content='ie=edge'>
    <title>Diák felvétele</title>
</head>
<body>
<form method='post'>
    <?php if (isset($errors) && count($errors) !== 0): ?>
        <ol>
            <?php foreach ($errors as $error): ?>
                <li><?= $error ?></li>
            <?php endforeach; ?>
        </ol>
    <?php endif; ?>


    <label for='name'>Név*</label>
    <input id='name' name='name' value='<?= $name ?? '' ?>'>
    <!--  Nem kéri a feladat, de így kell a mező mellé kiírni.  -->
    <?php if (isset($errors['name'])): ?> <span><?= $errors['name'] ?></span> <?php endif; ?>
    <br>

    <label for='age'>Életkor*</label>
    <input id='age' name='age' value='<?= $age ?? '' ?>'>
    <?php if (isset($errors['age'])): ?> <span><?= $errors['age'] ?></span> <?php endif; ?>
    <br>

    <button>Hozzáadás</button>
</form>
</body>
</html>
