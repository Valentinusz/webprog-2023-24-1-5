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

$id = $_GET["id"] ?? "";

$contacts = new ContactStorage();
$contactToUpdate = $contacts->findById($id);

if ($contactToUpdate['user_id'] !== $auth->authenticated_user()['id']) {
    header("Location: index.php");
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $errors = [];

    $name = trim($_POST["name"] ?? "");
    if (strlen($name) == 0) {
        $errors["name"] = "A név megadása kötelező!";
    } else if (strlen($name) > 32) {
        $errors["name"] = "A név maximum 32 karakter hosszú lehet.";
    } else if ($name !== htmlentities($name)) {
        $errors["name"] = "A név nem megengedett karaktereket tartalmaz.";
    }

    $email = trim($_POST["email"] ?? "");
    if (strlen($email) < 5) {
        $errors["email"] = "Az email megadása kötelező!";
    } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors["email"] = "Az email formátuma nem megfelelő.";
    }

    $phone = str_replace(" ", "", trim($_POST["phone"] ?? ""));
    if (strlen($phone) > 0 && preg_match("/^\+?\d{11}$/", $phone) === 0) {
        $errors["phone"] = "A telefonszám formátuma nem megfelelő.";
    }

    if (count($errors) === 0) {
        $contactToUpdate["name"] = $name;
        $contactToUpdate["email"] = $email;
        $contactToUpdate["phone"] = $phone;

        // contactToUpdate egy másolat szóval még el is kell menteni
        $contacts->update($id, $contactToUpdate);

        header("Location: index.php");
        exit();
    }
}

?>

<!DOCTYPE html>
<html lang="hu-HU">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="resources/css/style.css">
    <title>Névjegy módosítása - Névjegyek</title>
</head>
<body>
    <?php require 'resources/views/_nav.php'; ?>
    <main>
        <h1>Névjegy módosítása</h1>
        <form method="POST">
            <label for="name">Név*</label>
            <input id="name" name="name" value="<?= isset($errors) ? $name : $contactToUpdate["name"] ?>">
            <?php if(isset($errors["name"])): ?><span class="error"><?= $errors["name"] ?></span><?php endif; ?>

            <label for="email">Email*</label>
            <input id="email" name="email" value="<?= isset($errors) ? $email : $contactToUpdate["email"] ?>">
            <?php if(isset($errors["email"])): ?><span class="error"><?= $errors["email"] ?></span><?php endif; ?>

            <label for="phone">Telefonszám</label>
            <input id="phone" name="phone" value="<?= isset($errors) ? $phone : $contactToUpdate["phone"] ?>">
            <?php if(isset($errors["phone"])): ?><span class="error"><?= $errors["phone"] ?></span><?php endif; ?>

            <button type="submit">Módosítás</button>
        </form>
    </main>
</body>
</html>