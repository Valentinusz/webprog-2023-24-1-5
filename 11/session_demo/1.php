<?php

session_start();

var_dump($_SESSION);

$_SESSION['name'] = 'Bálint';

var_dump($_SESSION);

session_write_close();