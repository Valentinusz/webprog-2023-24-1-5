<?php

// file_get_contents egy fájl tartalmát beovlassa stringként
// json_decode egy stringet JSON-ként értelmez
// alapból objektumént adja vissza, ha asszociatív paraméter true akkor asszociatív tömbbe
// null ha nem sikerül a parse-olás
$contacts = json_decode(file_get_contents('data.json'), true) ?? [];

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
        </tr>
        </thead>
        <tbody>
        <?php foreach ($contacts as $contact): ?>
            <tr>
                <td><?= $contact['name'] ?></td>
                <td><?= $contact['email'] ?></td>
                <td><?= $contact['phone'] ?? '-' ?></td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
</body>
</html>
