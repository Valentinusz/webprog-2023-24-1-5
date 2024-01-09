<?php 

require_once "Storage.php";

// kiterjesztett osztály, hogy ne kelljen mindig slopes.json fájlnevet irogatni
class SlopeStorage extends Storage {
    public function __construct(){
        parent::__construct(new JsonIO("slopes.json"));
    }
}