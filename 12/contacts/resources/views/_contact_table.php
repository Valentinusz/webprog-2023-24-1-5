<?php

/**
 * @var array $contacts
 */

?>
<table id='contacts'>
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