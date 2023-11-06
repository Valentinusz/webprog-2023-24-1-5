<?php
// szerveroldali webprogramozás célja: dinamikus tartalom előállítása
// tartalom sokféle lehet
// legegyszerűbb egész HTML-t legenerálni is válaszként visszaadni (elsődlegesen ezzel fogunk foglalkozni)
// JSON, XML és egyéb félig strukturált adatot is vissza lehet adni (ezt majd kliensoldalon kell kezelni)

// PHP
// dinamikusan gyengén típusos többparadigmájú (procedurális múlt, teljesértékű OOP, first-class függvények)
// JS-hez sok tekintetben hasonló (viszont ; kötelező)
// php biztosít fejlesztői szervert: ez a PHP telepítése után a php -S <address>:<port> paranccsal indítható el
// pl. php -S localhost:8000
// többféle verzió (egészen nagy különbségek), mi 8.0 fölötti verziót fogunk használni
// doksi: https://www.php.net/manual/en/

// PHP működése
// kliens HTTP kérést küldd a webszervernek, ha létezik az erőforrás .php kiterjesztéssel a common gateway interface-en
// keresztül végrehajtásra kerül a PHP script, amit a script a standard outputra ír lesz a kliensnek adott HTTP válasz

// PHP nyelv jellemzői

# Kommentek

# (Perl-féle) komment

// komment

/*
 * többsoros
 * komment
*/



// Kiíratás
echo "asd";



# Változók

// dinamikusan típusos nyelv
// $ prefix (így könnyű stringbe helyettesíteni)
$valtozo = "asd";
const asd = 'konstans';


# Debug

// egy változó információinak kiiratása a standard outputra
var_dump($valtozo);

// "olvashatóbb formában"
echo '<pre>';
print_r($valtozo);
echo '</pre>';

// olyan formában ami valid PHP kód
var_export($valtozo);



# Típusok
// megszokott műveletek <, <=, >, >=, ==, !=, ===, !== (szigorú egyenlőségvizsgálatok)

## szám
// kétféle egész és dupla precizitású float
$intVal = 1_000_000;
$floatVal = 3.1_4;
// számokat _-al lehet tagolni
// int túlcsordulás -> float konverzió
// megszokott aritmetika opreátorok +, -, *, /, %, összevont értékadó operátorok, ++, --
var_dump(intdiv($intVal, 12)); // egész osztás
var_dump($intVal**2); // hatványozás


## string
$str = '$valtozo';
$strSub = "{$valtozo}dsdas";
$concat = $str . $strSub; // összefűzés
// `` shell commandként hajta végre a megadott szöveget -> ne használjuk
// műveletek általában str-el vannak prefixálva
var_dump(strlen($str));


## bool
$trueVal = true;
$falseVal = false;
// php fura típuskonverziókat tud végezni pl. "0" -> false


## speciális érték null (logikai viszgálatnál false)
$nullVal = null;


## array
// valójában asszociatív tömb (mint JS-be az objektum)
// fontos különbség, hogy paraméterátadásnál primitív értékként viselkednek (másolódnak)
// akár több típusú kulcs és érték is lehet
// array, objektum, függvény nem lehet kulcs
// általában int és string
// tetszőleges mértékben egymásba ágyazhatók
$assoc_array = [
    null => "asdasd",
    false => "asdsad",
//    3.14 => "asdasd", // float -> int, ha kulcs
    3 => "asdasdasd",
    'elso' => [1 => "asd", "sd" => 5],
    1 => [1, 2, 3],
    5 // kulcs nélkül (ekkor a kulcs a legnagyobb int kulcs rákövetkezője)
];

var_dump($assoc_array);

// ha nincs kulcs sima index alapú tömb
$index_array = [1, 2, 3, 4, 5];

var_dump($index_array);

// érték beállítása
$assoc_array['harmadik'] = "asdasdsd";

// ha nem adunk meg semmit akkor a legnagyobb int kulcs rákövetkezője lesz az új kulcs
$assoc_array[] = 'asdasdasd';

// tömb hossz
var_dump(count($assoc_array));

// tömb műveletek általában array-el prefixált függvények
// viszonylag beszédes nevek
var_dump(array_reduce($index_array, fn($a, $b) => $a + $b, 0));
var_dump(array_sum($index_array));
var_dump(array_map(fn($num) => $num ** 2, $index_array));
var_dump(array_unique($index_array));


## Objektum
// stdClass-től minden implicit módon örököl
// Java-hoz nagyon hasonló, kivéve package private láthatóság
// adattag elérés opretátor ->
abstract class Obj extends stdClass implements asd {
    public int $asd;
    private $sadasda;
    protected $asdasd;

    // túlterhelés nincs
    public function __construct(int $asd) {
        $this->asd = $asd;
    }

    // __ = "magic methods"
    public function __toString(): string {
        return "asd";
    }

    // ? lehet null, | megadott típusok közül az egyik
    public abstract function asd(?int $asd, string|int $asd2): string;
}

interface asd {

}



## Statikus típusosság
// az objektumok adattagjai illetve a függvények típusinformációval egészíthetőek ki, lásd előző osztálydefiníció
// speciális típusok
// void - nincs visszatérés
// never - függvény soha nem áll le
// mixed - az összes alap típus egyike
// callable - függvény neve vagy implementál az __invoke magic method-ot



## Függvények
// 3 típus

### klasszikus
function inc(int $a): int {
    return $a + 1;
}

// átadás paraméterként: függvény neve mint string
var_dump(array_map('inc', $index_array));


### lambda
// Closure típusú objektumok
$inc2 = function(int $a) {
    return $a + 1;
};

var_dump($inc2);
var_dump(array_map($inc2, $index_array));


### egysoros lambda
// Closure típusú objektumok
$inc3 = fn(int $a) => $a + 1;

var_dump($inc3);
var_dump(array_map($inc3, $index_array));


### zártság
// külső scope-ból csak úgy tudunk adatot elérni, ha azt explicit elmondjuk a PHP-nak
// kivétel szuperglobális változók https://www.php.net/manual/en/language.variables.superglobals.php

$b = 5;

#### sima függvény esetén törzsön belül global
function a(int $a): int {
    global $b;
    return $a + $b;
}

#### lambda esetén use()
$a2 = function(int $a) use ($b) {
    return $a + 1;
};
// egysoros lambdánál nem működik



## Tömbök paraméterátadása
// érték szerint
// &-el megadható, hogy egy paraméter mindig referencia szerint adódjon át
function modify_array(array &$arr, mixed $key, mixed $value): void {
    $arr[$key] = $value;
}

$arr2 = [1, 2, 3];

// értékadásnál is tudunk refereenciákat használni
$arr3 = &$arr2;

var_dump($arr2);

modify_array($arr3, 2, 4);

var_dump($arr2);


# vezérlési szerkezetek

## elágazás
if (true) {

} elseif (false) {

} else if (false) {

} else {

}

## switch
switch ($str) {
    case 'a':
        echo 'a';
    case 'fallthrough':
        echo 'fall';
        break;
    case 'b':
        echo 'b';
        break;
    default:
        echo 'else';
        break;
}

## while
while (true) {
    break;
}

## do-while
do {
    continue;
} while(false);

## for

for ($i = 0; $i < 10; $i++) {

}

## foreach

foreach ($index_array as $item) {

}

## kulcs érték foreach
foreach ($assoc_array as $index => $item) {

}

# alternatív szintaxis
// minden vezérlési szerkezet leírható így is

if (true):

elseif (false):

else:

endif;

// ez azért jó mert így a php kódunkat HTML kód közé tudjuk ékelni