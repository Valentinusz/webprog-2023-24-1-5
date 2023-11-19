<?php

// require -> szkript meghal ha nem találja meg a fájlt
// include -> szkript továbbfut
// _once -> csak egyszer húzza be
require_once 'Storage.php';

class ContactStorage extends Storage {
    public function __construct() {
        parent::__construct(new JsonIO('data.json'));
    }
}