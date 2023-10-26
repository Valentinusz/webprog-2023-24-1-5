<?php

//
/**
 *
 */

/**
 *
 */

#

$intNum = 5;
$sep = 5_000_000;
$floatNum = 3.14;

$str = 'asdasd';
$str2 = "asdasd";
$str3 = "$str";
$str4 = $str . $str2;

$boolean = true;

# array
$index_array = [1, 2, 3, 4, 5];


var_dump($index_array);

echo '<br>';

var_export($index_array);

echo '<pre>';
print_r($index_array);
echo '</pre>';

$associative_array = ['elso' => 1, 'masodik' => 2, 'harmadik' => "asdasd"];

var_dump($associative_array);

$index_array []= 6;


var_dump($index_array);

$associative_array['negyedik'] = "kasda";

var_dump($associative_array);


// hossz
var_dump(count($associative_array));

// array érték szerint
function editArray(&$array) {
    $array['elso'] = -1;
}

editArray($associative_array);

var_dump($associative_array);


for ($i = 0; $i < 5; $i++) {

}

foreach ($index_array as $item) {

}

foreach ($associative_array as $index => $item) {

}


$newItem = 5;

$n = 5;

$exponent = function(int $num) use ($n) {
    return $num ** $n;
};

$square = fn(int $num) => $num ** 2;

var_dump($exponent(5));

var_dump(array_reduce($index_array, fn($a, $b) => $a + $b, 0));
var_dump(array_sum($index_array));
var_dump(array_map(fn($num) => $num ** 2, $index_array));

var_dump(array_filter($index_array, fn($num) => $num % 2 == 0));


