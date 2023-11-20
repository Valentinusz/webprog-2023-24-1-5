<?php

require_once 'ContactStorage.php';

// ha nem post ne csináljunk semmit
if($_SERVER['REQUEST_METHOD'] === 'POST') {
	// ha nincs azonosító paraméter irányítsuk vissza a felhasználót
	if (!isset($_GET['id'])) {
		header('Location: index.php');
		exit();
	}
	
	$contacts = new ContactStorage();
	$contacts->delete($_GET['id']);
}

header('Location: index.php');
