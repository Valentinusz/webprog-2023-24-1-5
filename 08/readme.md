# Kliens szerver kommunikáció

HTTP protokoll felett zajlik. Kliens kérést indít, amire a szerver válaszol.

Kérés részei:
- Metódus (`GET`, `POST`, ...)
- Fejlécek (ha vannak)
- Üzenettörzs ha vannak

Válasz részei:
- Státuszkód pl. 404
- Státuszkód szövegesen pl. Not Found
- Fejlécek (ha vannak)
- Üzenettörzs (ha van)

## URL

## Kérés metódusok

A kérés metódusa határozza meg a kérés tulajdonságait és, hogy milyen módon kerül átadásra az adat.

### Idempontens kérés
Olyan kérés, ami tetszőleges mennyiségű ismétlés után is ugyan azt a hatást fejti ki.

***

### Biztonságos kérés
Olyan kérés, ami nem változtat a szerveren lévő állapoton (pl. nem ír az adatbázisba).

***

### Legfontosabb metódusok

| Metódus  | Leírás                                                  | Üzenettörzs | Biztonságos | Idempotens |
|----------|---------------------------------------------------------|:-----------:|:-----------:|:----------:|
| `GET`    | Adatlekérés.                                            |    Nincs    |    Igen     |    Igen    |
| `POST`   | Szerverállapot változtatás. Vagy erőforrás létrehozása. |     Van     |     Nem     |  Nem[^1]   |
| `HEAD`   | GET, de csak a fejléceket kéri le.                      |    Nincs    |    Igen     |    Igen    |
| `PUT`    | Erőforrás felülírása.                                   |     Van     |     Nem     |    Igen    |
| `PATCH`  | Erőforrás frissítése.                                   |     Van     |     Nem     |  Nem [^2]  |
| `DELETE` | Erőforrás törlése.                                      |    Lehet    |     Nem     |    Igen    |

[^1]: ha a `POST` mondjuk a `PUT`-al ekvivalensen működik.
[^2]: `PATCH` kérés mondjuk egy erőforrás átheleyzése is, ami már nem ismételhető meg.

## Kérések indítása
- URL beírása vagy linkre kattintás (`GET`)
- Űrlap elküldés (`GET` és `POST`)
- JavaScriptből (bármi)
- Külső kliensből (bármi)

## Űrlap
Az űrlap elküldéseker a `name` attribútummal rendelkező bemenetekben szereplő adatok szövegként elküldésre kerülnek.

`GET` esetén átirányítás, az URL query stringében szerepelnek az adatok. (Titkosítás hiánya, hossz limit)

`POST` esetén az üzenettörzsben jelennek meg az adatok.

## Validáció

A kliens által elküldött adatokat validálnunk kell. Semmilyen mértékben nem építhetünk a kliens jóhiszeműségére, hiszen
még egy kliens oldalon lévő űrlapot is tetszőleges módon ronthat el a HTML átírásával. Ezért
1. Ellenőrizzük megjött-e az elvárt kulcsú adat
2. Vizsgáljuk meg az általunk meghatérozott korlátozásoknak megfelel-e. (pl. nem üres, max 32 hosszú, email formátumú stb.)
3. Ha használni akarjuk konvertáljuk az adatot a megfelelő formátumra.
