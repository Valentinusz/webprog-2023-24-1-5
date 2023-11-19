# Kliens szerver kommunikáció

HTTP protokoll felett zajlik. Kliens kérést indít, amire a szerver válaszol.

Kérés részei:
- Metódus (GET, POST, ...)
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

| Metódus | Leírás                                | Üzenettörzs | Biztonságos | Idempotens |
|---------|---------------------------------------|:-----------:|:-----------:|:----------:|
| GET     | Adatlekérés.                          |    Nincs    |    Igen     |    Igen    |
| POST    | Általános szerverállapot változtatás. |     Van     |     Nem     | Lehet[^1]  |
| HEAD    | GET, de csak a fejléceket kéri le.    |    Nincs    |    Igen     |    Igen    |
| PUT     | Erőforrás felülírása.                 |     Van     |     Nem     |    Igen    |
| PATCH   | Erőforrás frissítése.                 |     Van     |     Nem     |  Nem [^2]  |
| DELETE  | Törli a megadott erőforrást.          |    Lehet    |     Nem     |    Igen    |

[1^]: ha a POST mondjuk a PUT-al ekvivalensen működik.
[^2]: d.
