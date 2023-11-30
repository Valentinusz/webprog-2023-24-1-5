<?php

session_start();

require_once "storage/ContactStorage.php";
require_once "vendor/Auth.php";
require_once "storage/UserStorage.php";

$auth = new Auth(new UserStorage());


?>

<!DOCTYPE html>
<html lang="hu-HU">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="resources/css/style.css">
    <title>Főoldal - Névjegyek</title>
</head>
<body>
    <?php require 'resources/views/_nav.php'; ?>
    <header role="banner">
        <h1>Névjegyek</h1>
    </header>
    <main>
        <h2>Névjegyeim</h2>
        <?php if($auth->is_authenticated()): ?>
        <?php
            $contactStorage = new ContactStorage();
            $contacts = $contactStorage->findAll(['user_id' => $auth->authenticated_user()['id']]);
        ?>
        <a href="create.php">Új névjegy</a>
        <table>
            <thead>
                <tr>
                    <th>Név</th>
                    <th>Email</th>
                    <th>Telefonszám</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($contacts as $id => $contact) : ?>
                    <tr>
                        <td><?= $contact["name"] ?></td>
                        <td><?= $contact["email"] ?></td>
                        <td><?= $contact["phone"] ?? "-" ?></td>
                        <td>
                            <a href="edit.php?id=<?= $id ?>">Módosítás</a>
                        </td>
                        <td>
                            <form method="post" action="delete.php?id=<?= $id ?>">
                                <button class="delete">Törlés</button>
                            </form>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        <?php else: ?>
        <p>A névjegyek csak bejelentkezés után érhetőek el.</p>
        <?php endif; ?>
    </main>
</body>

</html>