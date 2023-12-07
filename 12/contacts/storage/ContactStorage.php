<?php

require_once "Storage.php";

class ContactStorage extends Storage {
    public function __construct() {
        parent::__construct(new JsonIO(__DIR__ . "/contacts.json"));
    }
}