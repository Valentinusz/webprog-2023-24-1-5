<?php

require_once 'SlopeStorage.php';

// ha nem POST kérés akkor ne csináljunk semmit
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.php');
    exit();
}

// ha nincs megadva mit akarunk törölni átirányítás
if (!isset($_GET['id'])) {
    header('Location: index.php');
    exit();
}

$storage = new SlopeStorage();
$slope = $storage->delete($_GET['id']);

header('Location: index.php');
