<?php

session_start();

require_once "../storage/ContactStorage.php";
require_once "../vendor/Auth.php";
require_once "../storage/UserStorage.php";

$auth = new Auth(new UserStorage());

$contactStorage = new ContactStorage();
$contacts = $contactStorage->findAll(['user_id' => $auth->authenticated_user()['id']]);

$query = $_GET['name'] ?? '';

$contacts = array_filter($contacts,fn($contact) => str_contains($contact['name'], $query));

require_once '../resources/views/_contact_table.php';