<?php

require_once 'ContactStorage.php';

$contacts = new ContactStorage();

?>

<!DOCTYPE html>
<html lang='hu'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport'
          content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'>
    <meta http-equiv='X-UA-Compatible' content='ie=edge'>
    <title>Névjegyek</title>
</head>
<body>
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
        <?php foreach ($contacts->findAll() as $key => $contact): ?>
            <tr>
                <td><?= $contact['name'] ?></td>
                <td><?= $contact['email'] ?></td>
                <td><?= $contact['phone'] ?? '-' ?></td>
                <!-- Módosító link -->
                <td><a href='modify.php?id=<?= $key ?>'>Szerkesztés</a></td>

                <!-- Törlő űrlap -->
                <td><form method='post' action='delete.php?id=<?= $key ?>'><button>Törlés</button></form></td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
    <a href='create.php'>Névjegy felvétele</a>
</body>
</html>
