<?php

require_once 'SlopeStorage.php';

// ha nem POST kérés akkor ne csináljunk semmit
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.php');
    exit();
}

$storage = new SlopeStorage();

// ha már létezik frissítsük
$slope = $storage->findOne(['name' => $_POST['name']]);

if ($slope) {
    $storage->update($slope['id'], [
        'id' => $slope['id'],
        'name' => $_POST['name'],
        'length' => $_POST['length'],
        'color' => $_POST['color'],
        'dangers' => $_POST['danger'] ?? []
    ]);
} else {
    // id-t majd a storage magátal hozzáadja
    // danger már $_POST-ba tömbként kerül bele 
    $storage->add([
        'name' => $_POST['name'],
        'length' => $_POST['length'],
        'color' => $_POST['color'],
        'dangers' => $_POST['danger']
    ]);
}

header('Location: index.php');
