<?php

session_start();

require_once "storage/UserStorage.php";
require_once "vendor/Auth.php";

$auth = new Auth(new UserStorage());
$auth->logout();

header("Location: index.php");
exit();