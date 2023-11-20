<?php
require_once 'ContactStorage.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $errors = [];
    $data = [];

    $success = validate($errors, $data);

    if ($success) {
        $contacts = new ContactStorage();
        $contacts->add($data);

        header('Location: index.php');
        exit();
    }
}

?>

<?php
function validate(array &$errors, array &$data): bool {
    $name = trim($_POST['name'] ?? '');
    if (strlen($name) == 0) {
        $errors['name'] = 'A név megadása kötelező!';
    } else {
        if (strlen($name) > 32) {
            $errors['name'] = 'A név maximum 32 karakter hosszú lehet.';
        }
    }

    $email = trim($_POST['email'] ?? '');
    if (strlen($email) === 0) {
        $errors['email'] = 'Az email megadása kötelező!';
    } else {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Az email formátuma nem megfelelő.';
        }
    }

    $phone = trim($_POST['phone'] ?? '');
    if (strlen($phone) > 0) {
        $format = "/^\d{2} ?\d{2} ?\d{3} ?\d{4}$/";

        if (!filter_var($phone, FILTER_VALIDATE_REGEXP, ['options' => ['regexp' => $format]])) {
            $errors['phone'] = 'A telefonszám formátuma nem megfelelő.';
        }
    }

    if (count($errors) === 0) {
        $data = ['name' => $name, 'email' => $email, 'phone' => $phone === '' ? null : $phone];
        return true;
    }

    return false;
}
?>

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>8. gyakorlat</title>
</head>
<body>
    <form method='post'>
        <label for='name'>Név*</label>
        <input id='name' name='name' value='<?= $name ?? '' ?>'>
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
    <a href='index.php'>Vissza</a>
</body>
</html>