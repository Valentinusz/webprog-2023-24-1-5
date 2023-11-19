# Storage

Készítettünk egy [Storage osztályt](https://valentinusz.github.io/notes/webprog/storage), mely segítségével még
magasabb szinten lehet kezelni az adatforrásainkat.

Jelenlegi alkalmazásunk egyetlen adatforrásból áll.

Ezt a `ContactStorage.php` osztály példányain keresztül töltöm be.

```php
require_once 'Storage.php';

class ContactStorage extends Storage {
    public function __construct() {
        parent::__construct(new JsonIO('data.json'));
    }
}
```

# CRUD

Így hogy képesek vagyunk adatot betölteni egy egyszerű erőforrások létrehozására (create), megjelenítésére (read),
frissítésére (update) és törlésére (delete) lehetővé tevő alkalmazást fogunk készíteni.

Mivel az űrlapokkal csak `GET` és `POST` kéréseket tudunk indítani, egyelőre csak ez a két metódust fogjuk használni.

## Megjelenítés
Az `index.php` fájlban. A többi művelet végpontjai innen érhetőek el.

## Létrehozás

Az eddigi létrehozó űrlappal ami a `contact.php` fájlba volt nincs teendőnk, de az egyszerűség
kedvéért `create.php`-ra nevezzük át a fájlt.

## Módosítás

A módosító nagyon hasonló a létrehozáshoz, de URL paraméterként megkapja a módosítandó erőforrás azonosítóját.

`GET` kéréskor az azonosítóhoz tartozó rekord adataival tölti fel az űrlapot.

`POST` kéréskor az azonosítóhoz tartozó rekordot írja felül.

Állapottartás kicsit más.

## Törlés

Egyedül `POST` kérést fogad az URL-ben megadott azonosítójú erőforrást törli.