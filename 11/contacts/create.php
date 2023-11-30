<?php

session_start();

require_once "storage/ContactStorage.php";
require_once "vendor/Auth.php";
require_once "storage/UserStorage.php";

$auth = new Auth(new UserStorage());

if (!$auth->is_authenticated()) {
    header('Location: login.php');
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $errors = [];

    $name = trim($_POST["name"] ?? "");
    if (strlen($name) == 0) {
        $errors["name"] = "A név megadása kötelező!";
    } else if (strlen($name) > 32) {
        $errors["name"] = "A név maximum 32 karakter hosszú lehet.";
    }

    $email = trim($_POST["email"] ?? "");
    if (strlen($email) === 0) {
        $errors["email"] = "Az email megadása kötelező!";
    } else if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
        $errors["email"] = "Az email formátuma nem megfelelő.";
    }

    $phone = str_replace(" ", "", trim($_POST["phone"] ?? ""));
    if (strlen($phone) > 0 && preg_match("/^\+?\d{11}$/", $phone) === 0) {
        $errors["phone"] = "A telefonszám formátuma nem megfelelő.";
    }

    if (count($errors) === 0) {
        $contacts = new ContactStorage();

        $contacts->add([
            "name" => $name,
            "email" => $email,
            "phone" => $phone === "" ? null : $phone,
            "user_id" => $auth->authenticated_user()["id"]
        ]);

        header("Location: index.php");
        exit();
    }
}
?>

<!DOCTYPE html>
<html lang="hu-HU">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" href="resources/css/style.css">
    <title>Új névjegy - Névjegyek</title>
</head>
<body>
    <?php require 'resources/views/_nav.php'; ?>
    <main>
        <h1>Új névjegy</h1>
        <form method="post">
            <label for="name">Név*</label>
            <input id="name" name="name" value="<?= $name ?? "" ?>">
            <?php if(isset($errors["name"])): ?><span class="error"><?= $errors["name"] ?></span><?php endif; ?>

            <label for="email">Email*</label>
            <input id="email" name="email" value="<?= $email ?? "" ?>">
            <?php if(isset($errors["email"])): ?><span class="error"><?= $errors["email"] ?></span><?php endif; ?>

            <label for="phone">Telefonszám</label>
            <input id="phone" name="phone" value="<?= $dphone ?? "" ?>">
            <?php if(isset($errors["phone"])): ?><span class="error"><?= $errors["phone"] ?></span><?php endif; ?>

            <button type="submit">Felvétel</button>
        </form>
    </main>
</body>
</html>