<?php
// validate.php használta nem kötelező

$errors = [];
$data = [];

// segédadatszerkezet: map ami megmondja egy szoba hány férőhelyes:
$rooms = [
    '3bed' => 3,
    '4bed' => 4,
    '6bed-small' => 6,
    '6bed-medium' => 6,
    '6bed-large' => 6
];

// a nincs semmi és üres string esetet egynek fogjuk kezelni
// trimmel leszedjük az elejéről és a végéről a szóközöket
$name = trim($_GET['name'] ?? '');
$email = trim($_GET['email'] ?? '');
$age = trim($_GET['age'] ?? '');
$room = trim($_GET['room'] ?? '');
$travelers = trim($_GET['travelers'] ?? '');

// név
$nameLength = strlen($name);

// a,
if ($nameLength === 0) {
    $errors['name'] = 'A név megadása köttelező!';
} elseif ($nameLength < 8 || $nameLength > 50) {
    // b,
    $errors['name'] = 'A név hosszának 8 és 50 karakter között kell lennie!';
}


// email
// a,
if (strlen($email) === 0) {
    $errors['email'] = 'Az email megadása köttelező!';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    // c, email validálás, false ha nem sikerül
    $errors['email'] = 'Az email formátuma helytelen!';
}

// életkor
// a,
if (strlen($age) === 0) {
    $errors['age'] = 'Az életkor kiválasztása kötelező!';
} elseif (!filter_var($age, FILTER_VALIDATE_INT)) {
    // d,
    $errors['age'] = 'Az életkor csak egész szám lehet!';
} else {
    // ha nem volt hiba konvertálunk
    $age = intval($age);

    // e,
    if ($age < 18 || $age > 99) {
        $errors['age'] = 'Az életkor 18 és 99 közötti!';
    }
}

// szoba
// a,
if (strlen($room) === 0) {
    $errors['room'] = 'A szoba kiválasztása kötelező!';
} elseif (!in_array($room, array_keys($rooms))) {
    // f, array_keys megadja egy assz. tömb kulcsait
    $errors['room'] = 'Érvénytelen szoba típus.';
}


// utasok
// a,
if (strlen($travelers) === 0) {
    $errors['travelers'] = 'Az utasok számának megadása kötelező!';
} else {
    // '' string automatikusan escape-el ezért duplát kell használni
    // explode egy adott substring mentén felbontja a stringet stringek tömbjére
    $splitData = explode("\n", $travelers);

    // utasok + jelentkező
    // ha a szobával kapcsolatban volt probléma ezt nincs értelme validálni
    // count tömbhossz
    if (!isset($errors['room']) && count($splitData) + 1 > $rooms[$room]) {
        $errors['travelers'] = "A szobában nem fér el ennyi ember!";
    } else {
        foreach($splitData as $row) {
            $rowLength = strlen($row);
    
            if ($rowLength < 8 || $rowLength > 50) {
                $errors['travelers'] = "Az egyik utas neve túl hosszú (8 és 50 karakter közt kell legyen)!";
                break;
            }
        }
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task 5</title>
    <link rel="stylesheet" href="src/index.css">
</head>
<body>
    <h1>5. Jelentkezés a táborba / Apply to the trip</h1>
    <form novalidate>
        <label for="name">Név / Name</label>
        <input type="text" name="name" id="name">

        <label for="email">Email</label>
        <input type="email" name="email" id="email">

        <label for="age">Életkor / Age</label>
        <input type="number" name="age" id="age">

        <label for="room">Szoba / Room</label>
        <select name="room" id="room">
            <option value="3bed">3 ágyas / 3 beds</option>
            <option value="4bed">4 ágyas / 4 beds</option>
            <option value="6bed-small">6 ágyas (kicsi 40m²) / 6 beds (small 40m²)</option>
            <option value="6bed-medium">6 ágyas (közepes 52m²) / 6 beds (medium 52m²)</option>
            <option value="6bed-large">6 ágyas (tágas 60m²) / 6 beds (large 60m²)</option>
        </select>

        <label for="travelers">Egyéb utasok / Other travelers</label>
        <textarea name="travelers" id="travelers" cols="30" rows="10"></textarea>
        
        <input type="submit" value="Jelentkezem / Apply">
    </form>

    <!-- h, -->
    <?php if(count($errors) !== 0): ?>
        <div id="errors">
            <h2>Hiba! / Error!</h2>
            <ul>
                <?php foreach($errors as $error): ?>
                    <li><?= $error ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php else: ?>
        <div id="success">
            <h2>Sikeres jelentkezés! / Successful application!</h2>
            <div>
                Kiküldtük a vouchert az alábbi e-mail címre. / We sent the voucher to the following e-mail address.
                <span id="confirm-email"><?= $email ?></span>
            </div>
        </div>
    <?php endif; ?>

    <h2>Segítség a teszteléshez / Help for testing</h2>

    <h3>Helyben / In-place</h3>
    <ul>
        <li><a href="index.php?">Minden hiányzik / Everything is missing</a></li>
        <li><a href="index.php?name=Franz Joseph Otto Robert Maria Anton Karl Max Heinrich Sixtus Xaver Felix Renatus Ludwig Gaetan Pius Ignatius von Habsburg&email=giorgio@elte.hu&age=27&room=6bed-large&travelers=Valentino Pomzi%0D%0AVittorio Trio">Túl hosszú név / Too long Name</a></li>
        <li><a href="index.php?name=Giorgio Battori&email=giorgio-elte.hu&age=27&room=6bed-large&travelers=Valentino Pomzi%0D%0AVittorio Trio">Helytelen e-mail formátum / Wrong e-mail format</a></li>
        <li><a href="index.php?name=Giorgio Battori&email=giorgio@elte.hu&age=twentyseven&room=6bed-large&travelers=Valentino Pomzi%0D%0AVittorio Trio">Helytelen életkor formátum / Wrong age format</a></li>
        <li><a href="index.php?name=Giorgio Battori&email=giorgio@elte.hu&age=10&room=6bed-large&travelers=Valentino Pomzi%0D%0AVittorio Trio">Túl fiatal / Too young</a></li>
        <li><a href="index.php?name=Giorgio Battori&email=giorgio@elte.hu&age=100&room=6bed-large&travelers=Valentino Pomzi%0D%0AVittorio Trio">Túl öreg / Too old</a></li>
        <li><a href="index.php?name=Giorgio Battori&email=giorgio@elte.hu&age=27&room=8bed&travelers=Valentino Pomzi%0D%0AVittorio Trio">Rossz szoba érték / Bad room value</a></li>
        <li><a href="index.php?name=Giorgio Battori&email=giorgio@elte.hu&age=27&room=6bed-large&travelers=Valentino Pomzi%0D%0ADio">Túl rövid utas név / Too short traveler name</a></li>
        <li><a href="index.php?name=Giorgio Battori&email=giorgio@elte.hu&age=27&room=6bed-large&travelers=Valentino Pomzi%0D%0AFranz Joseph Otto Robert Maria Anton Karl Max Heinrich Sixtus Xaver Felix Renatus Ludwig Gaetan Pius Ignatius von Habsburg">Túl hosszú utas név / Too long traveler name</a></li>
        <li><a href="index.php?name=Giorgio Battori&email=giorgio@elte.hu&age=27&room=3bed&travelers=Valentino Pomzi%0D%0AVittorio Trio%0D%0APetro Miklo%0D%0AMireletto Pesto">Túl sok utas / Too many travelers</a></li>
        <li><a href="index.php?name=Giorgio Battori&email=giorgio@elte.hu&age=27&room=6bed-large&travelers=Valentino Pomzi%0D%0AVittorio Trio">Minden helyes / Everything correct</a></li>
    </ul>

</body>
</html>