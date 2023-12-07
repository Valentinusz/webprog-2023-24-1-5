<?php

require_once "../vendor/Auth.php";
require_once "../storage/UserStorage.php";

$auth = new Auth(new UserStorage());

header('Content-Type: application/json');

$response = [
    'in_use' => $auth->user_exists($_GET['id'] ?? '')
];

echo json_encode($response, JSON_PRETTY_PRINT);
