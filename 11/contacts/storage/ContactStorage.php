<?php

require_once "Storage.php";

class ContactStorage extends Storage {
    public function __construct() {
        parent::__construct(new JsonIO("storage/contacts.json"));
    }
}