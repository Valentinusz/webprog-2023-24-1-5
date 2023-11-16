<?php

if (!isset($_GET['id'])) {
    header('Location: index.php');
    exit();
}

require_once 'ContactStorage.php';

$contacts = new ContactStorage();

$contacts->delete($_GET['id']);

header('Location: index.php');