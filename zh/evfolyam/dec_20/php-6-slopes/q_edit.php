<?php

require_once 'SlopeStorage.php';

// ha nem POST kérés akkor ne csináljunk semmit
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.php');
    exit();
}

$storage = new SlopeStorage();

// ilyet ne csináljatok gyakorlatban mindig validálni kell, de most a feladat megengedi
$storage->update($_POST['id'], [
    'id' => $_POST['id'],
    'name' => $_POST['name'],
    'length' => $_POST['length'],
    'color' => $_POST['color'],
    'dangers' => $_POST['danger'],
]);

header('Location: index.php');
