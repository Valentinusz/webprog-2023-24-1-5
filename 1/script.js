console.log("Helló világ!");

// JS doksi: https://developer.mozilla.org/en-US/docs/Web/JavaScript
// GitHub: https://github.com/Valentinusz/webprog-2023-24-1-5
// Canvas: https://canvas.elte.hu/courses/38953

// 2. Készítsd el a Fahrenheitből Celsius fokba átalakító függvényt! 5/9 * (F-32)
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
function f2C(F) {
    return 5/9 * (F-32);
}

console.log(
    f2C(40)
);

// klasszikus lambda
const f2C2 = function(F) {
    return 5/9 * (F-32);
}

console.log(
    f2C2(40)
);

//arrow function
const f2C3 = (F) => {
    return 5/9 * (F-32);
}

console.log(
    f2C3(40)
);

// arrow function (1 soros)
const f2C4 = F => (5/9 * (F-32));

console.log(
    f2C4(40)
);

// 7. Adott két szám. Írj függvényt, amely visszaadja legnagyobb közös osztójukat!
// Függvény lnko(a, b: Egész): Egész 
//     Ha a < b akkor csere(a, b)
//     maradek = a mod b
//     Ciklus amíg maradek > 0
//         a := b
//         b := maradek
//         maradek := a mod b
//     Ciklus vége
//     lnko := b
// Függvény vége
function lnko(a, b) {
    if (a < b) {
        // destructuring
        [a, b] = [b, a];
    }
    let maradek = a % b;
    while(maradek > 0) {
        // utanánézni ez pontosan hogy működik
        [a, b, maradek] = [b, maradek, a % b]
    }
    return b;
}

console.log(
    lnko(340, 60)
);

// tömbfüggvények
// magasabb rendű függvények
// progarmozási tételeket jól lehet implementálni

// 11. Egy számsorozatban keress meg egy negatív számot.
// keresés
const numbers = [2, 5, 9, -1, 3, 5, 1, 2, 1];

// find
console.log(
    numbers.find(number => number < 0)
);

// findIndex
console.log(
    numbers.findIndex(number => number < 0)
);

// 12. Számold meg, hány páros szám van egy számokat tartalmazó tömbben!
// megszámlálás
// 2 módon is megoldható

// kiválogatás
console.log(
    numbers.filter(number => number % 2 == 0).length
)

console.log(
    numbers.reduce((acc, curr) => (curr % 2 === 0 ? acc+1 : acc), 0)
);

console.log(
    numbers.reduce((acc, curr) => {
        if (curr % 2 === 0) {
            return acc+1;
        } else {
            return acc;
        }
    }, 0
));

// 13. Válogasd ki azokat a számokat, amelyek mindkét szomszédjuktól egy előre bekért értéken belül térnek el.
const limit = 2;

console.log(
    numbers.filter((currentValue, currentIndex, array) => {
        // undefinedon aritmetikai művelet végzése = NaN (not a number)
        // logika kiértékelés hamis
        // összahasonlítás más számmal szintén hamis
        return Math.abs(currentValue - array[currentIndex - 1]) < limit &&
        Math.abs(currentValue - array[currentIndex + 1]) < limit
    })
);

// 16. Döntsd el egy mátrixról, hogy minden eleme páros-e!
const matrix = [[1, 2, 3], [2, 3, 4], [6, 4, 2]];
// eldöntés
// minden: every
// létezik: some

console.log(
    matrix.every(row => row.every(number => number % 2 == 0))
);

// minden sor tartalmaz-e páros elemet
console.log(
    matrix.every(row => row.some(number => number % 2 == 0))
);

// Objektum
// megengedőbb JSON (JavaScript Object Notation)
const obj = {
    mezo1: 12,
    'mezo2': 'alma',

    metodus() {
        console.log(this.mezo2);
    },

    metodus2: function() {
        console.log(this.mezo1);
    },

    metodus3: () => {
        console.log(this.mezo1);
    }
};

console.log(
    obj.mezo1
);

console.log(
    obj['mezo2']
);

obj.metodus();
obj.metodus2();
obj.metodus3();

class Movie {
    constructor(title, length, category, directors) {
        this.title = title;
        this.length = length;
        this.category = category;
        // spread operator const a = [a, b ,c] ...a = a,b,c
        // sekély másolat
        this.directors = [...directors];
    }
}

// 27. a, b, c
const movies = [
    new Movie("Harry Potter and the Philosopher's Stone", 152, "fantasy", ["David Heyman"]),
    new Movie("Harry Potter and the Prisoner of Azkaban", 142, "fantasy", ["David Heyman", "Chris Columbus", "Mark Radcliffe"]),
    new Movie("Harry Potter and the Half-Blood Prince", 153, "fantasy", ["David Heyman", "David Barron"])
]

// a,
console.log(movies);

movies.forEach(movie => console.log(movie));
movies.forEach(console.log);

console.table(movies);

// b,
console.table(
    movies.filter(({directors}) => directors.length > 1)
);

// c,
// maximumkiválasztás
console.log(
    movies.reduce(
        (longest, currentMovie) => (currentMovie.length > longest.length ? currentMovie : longest),
        movies[0]
    )
)


// 29. a, b, c, d, e, g, h 
const temperatures = [5, 6, -1, 8, 12, 13, 15, 4, -2, 5, 9, 15, 20, 19, 17];

// a,
console.log(
    temperatures.filter(temperature => temperature <= 0)
)

// b,
// másolás tétel
// valamilyen logika mentén egy új tömböt hoz létre
console.log(
    temperatures.map(temperature => temperature + "C")
);

// c,
console.log(
    temperatures.reduce((max, currentTemp) => (currentTemp > max ? currentTemp : max), -Infinity)
)

// d, Add meg, hányszor ment a hőmérséklet 20 fok alá!
console.log(
    temperatures.filter(temperature => temperature < 20).length
)

// e, Döntsd el, van-e 40 fok fölötti érték!
console.log(
    temperatures.some(temperature => temperature > 40)
);

// f, Döntsd el, hogy mindegyik hőmérsékletérték pozitív-e!
console.log(
    temperatures.every(temperature => temperature > 0)
)

// g, Add meg az első olyan értéket, amikor 10 fok fölé ment a hőmérséklet!
console.log(
    temperatures.find(temperature => temperature > 10)
);

// 28. házi