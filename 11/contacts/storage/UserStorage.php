<?php

require_once "Storage.php";

class UserStorage extends Storage {
    public function __construct() {
        parent::__construct(new JsonIO("storage/users.json"));
    }
}