<?php
// $_SERVER szuperglobális-ból lekérhető a kérés metódusa
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // POST esetén bonyolultabb validációt kell végezni
    // validáció során a hibákat az $errors asszociatív tömbbe gyűjtjük
    // a hibákat majd a megfelelő input után ki fogjuk írni
    // hiba esetén az űrlap korrábi állapotát visszaállítjuk
    // sikert a count($errors) === 0 kifejezés jelzi

    $errors = [];

    // ha nem jött adat tekintsük úgy mintha üres adat jött volna
    $name = trim($_POST['name'] ?? '');
    if (strlen($name) == 0) {
        // kezeljük ezt a két esetet közösen ezzel a hibaüzenettel
        $errors['name'] = 'A név megadása kötelező!';
    } else {
        if (strlen($name) > 32) {
            $errors['name'] = 'A név maximum 32 karakter hosszú lehet.';
        }
    }

    $email = trim($_POST['email'] ?? '');
    if (strlen($email) < 5) {
        $errors['email'] = 'Az email megadása kötelező!';
    } else {
        // filter_var PHP beépített validátorai
        // igaz értéket adnak vissza, ha megadott szűrőnek megfelel
        // https://www.php.net/manual/en/function.filter-var.php
        // https://www.php.net/manual/en/filter.filters.php
        // Megjegyzés: filter_var()-al megtisztítást is végezhetünk
        // (pl. FILTER_SANITIZE_NUMBER_INT minden kivesz egy stringből ami nem +, -, vagy számjegy)
        // FILTER_VALIDATE_EMAIL email formátumnak megfelel-e
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Az email formátuma nem megfelelő.';
        }
    }


    $phone = trim($_POST['phone'] ?? '');
    // mivel a telefonszám opcionális, ha üres nem adunk rá hibát
    if (strlen($phone) > 0) {
        $format = "/^\d{2} ?\d{2} ?\d{3} ?\d{4}$/";

        // FILTER_VALIDATE_REGEXP adott reguláris kifejezésnek megfelel-e
        if (!filter_var($phone, FILTER_VALIDATE_REGEXP, ['options' => ['regexp' => $format]])) {
            $errors['phone'] = 'A telefonszám formátuma nem megfelelő.';
        }
    }

    if(count($errors) === 0) {
        var_dump([$name, $email, strlen($phone) === 0 ? null : $phone]);
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>8. gyakorlat</title>
</head>
<body>
    <!-- POST kérést küldjön, az action-ben megadott oldalra. (Ha üres vagy hiányzik saját magának küldi.)  -->
    <form method='post' action='' >
        <label for='name'>Név*</label>
        <!-- Ha létezik korábbról név válozó írjuk vissza az értékét! -->
        <input id='name' name='name' value='<?= $name ?? '' ?>'>
        <!-- Ha a hibatömb adott eleme be van állítva írjunk ki hibaüzenetet. -->
        <?php if(isset($errors['name'])): ?><span><?= $errors['name'] ?></span><?php endif; ?>
        <br>


        <label for='email'>Email*</label>
        <input id='email' name='email' value='<?= $email ?? '' ?>'>
        <?php if(isset($errors['email'])): ?><span><?= $errors['email'] ?></span><?php endif; ?>
        <br>

        <label for='phone'>Telefonszám</label>
        <input id='phone' name='phone' value='<?= $phone ?? '' ?>'>
        <?php if(isset($errors['phone'])): ?><span><?= $errors['phone'] ?></span><?php endif; ?>
        <br>

        <button>Felvétel</button>
    </form>
</body>
</html>