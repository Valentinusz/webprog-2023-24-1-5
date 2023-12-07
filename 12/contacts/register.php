<?php

require_once "storage/UserStorage.php";
require_once "vendor/Auth.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $errors = [];

    $username = trim($_POST["username"] ?? "");
    if (strlen($username) == 0) {
        $errors["username"] = "A felhasználónév megadása kötelező!";
    } else if (strlen($username) > 32) {
        $errors["username"] = "A felhasználónév maximum 32 karakter hosszú lehet.";
    }

    $password = trim($_POST["password"] ?? "");
    $passwordLength = strlen($password);
    if ($passwordLength == 0) {
        $errors["password"] = "A jelszó megadása kötelező!";
    } else if($passwordLength < 8 || $passwordLength > 16) {
        $errors["password"] = "A jelszó hossza 8 és 16 karakter közti.";
    }

    if (count($errors) === 0) {
        $auth = new Auth(new UserStorage());

        $auth->register([
            "username" => $username,
            "password" => $password
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
    <main>
        <h1>Regisztráció</h1>
        <form method="post">
            <span id='taken' class='error' hidden=''>A felhasználónév foglalt.</span>
            <label for="username">Felhasználónév*</label>
            <input id="username" name="username" value="<?= $username ?? "" ?>">
            <?php if(isset($errors["username"])): ?><span class="error"><?= $errors["username"] ?></span><?php endif; ?>
            <!-- type="password" -->
            <label for="password">Jelszó*</label>
            <input id="password" name="password" value="<?= $password ?? "" ?>" >
            <?php if(isset($errors["password"])): ?><span class="error"><?= $errors["password"] ?></span><?php endif; ?>

            <button type="submit">Regisztráció</button>
        </form>
    </main>
    <script src='resources/js/register.js'></script>
</body>
</html>