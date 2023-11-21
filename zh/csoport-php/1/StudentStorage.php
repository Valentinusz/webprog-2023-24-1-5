<?php

require_once 'Storage.php';

class StudentStorage extends Storage {
    public function __construct() {
        parent::__construct(new JsonIO('students.json'));
    }
}