// DOM (Document Object Model)
// egy fa szerkezetű dokumentum (pl. SVG, XML, *HTML*) modellezése objektumokkal
// JS esetében általában a HTML DOM-ra gondolunk DOM alatt
// a DOM kényelmes interfészt biztosít, a HTML dokumentum manipulálásához
// objektumfa gyökere: document (globális változó)
// fát Node objektumok alkotják
// Node objektumnak 4 fajtája lehet
// 1. Document
// 2. Text (szöveges tartalom)
// 3. Element (HTML elemek)
// 4. Attribute (HTML elemek attribútumai)

console.log(document);
// 1. Egy gomb megnyomására írd ki a dokumentum valamelyik általad választott részére, hogy "Helló világ!"!

// a domban a querySelector metódussal tudunk keresni
// egyetlen paramétere egy CSS szelektor
// CSS szelektorok ismétléséhez ajánlom a CSS Diner (https://flukeout.github.io/) oldalt
// az első olyan html elemet reprezentáló objektumot adja vissza, melyre illeszkedik a megadott css szelektor
// ha nem illeszekedik semmire null
// CSS szelektorok ismétléséhez ajánlom a CSS Diner (https://flukeout.github.io/) oldalt
const button = document.querySelector('button#greet');
console.log("A gombot reprezentló objektum:", button);

// régi megoldás, nem ajánlott
// greetButton.onclick = () => {
//     console.log("asd")
// }

// eseménykezelő hozzáadása
// következő gyakorlaton részletesebben
button.addEventListener('click', () => {
    // egyszerűség kedvéért szúrjuk be a gomb után azt hogy helló
    // nem ez az egyetlen mód, helyzet és preferenciafüggő mit érdemes használni
    button.insertAdjacentText('beforeend', 'Helló világ!');
    // button.innerHTML += '<a>Helló világ!</a>'
    // innerHTML-el óvatosan mert amit megadunk string azt HTML-ként parse-olja be
    // button.innerText += '<a>Helló világ!</a>'
})

// 2. Kérj be egy számot, és annyiszor írd ki egymás alá egyre növekvő betűméretekkel a "Hello világ!" szöveget!
const printButton = document.querySelector('button#print-button');
const countInput = document.querySelector('input#print-count');
const secondTask = document.querySelector('article:nth-of-type(2)');
console.log(printButton, countInput, secondTask);

printButton.addEventListener('click', () => {
    // a value adattagon keresztül elérhető az input elemek value attribútumának értéke
    // attribútumok stringként tárolják az értéket -> ha biztosra akarunk menni parse-olni kell
    const printCount = Number.parseInt(countInput.value, 10); // NaN ha nem szám
    
    for (let index = 0; index < printCount; index++) {
        // elem létrehozása
        const element = document.createElement('h3');
        element.innerText = 'Helló világ!'; // innerText nyitó és záró tag közti szöveg

        // elem stílusa manipulálható a style adattagon keresztül
        // css-ben kebab-case JS-ben camelCase
        // style csak az inline stílusokat tartalmazza
        element.style.fontSize = `${1 + 0.25 * index}em` // !mértékegységre figyelni
        // a beállított stílusok is inline jelennek meg

        // utolsó gyerekként szúrja be a paraméterként megadott elemet
        secondTask.appendChild(element);
    }
})

// 3. Kérj be egy N számot, és készíts azzal egy NxN-es szorzótáblát!
const size = 10;

const table = document.createElement('table');

for (let i = 1; i <= size; i++) {
    const row = document.createElement('tr');
    for (let j = 1; j <= size; j++) {
        const cell = document.createElement('td');
        cell.innerText = i * j;
        row.appendChild(cell);
    }
    table.appendChild(row);
}

document.querySelector('article:nth-of-type(3)').appendChild(table);

// 6. Adott két szöveges beviteli mező és köztük egy gomb.
// A gomb lenyomására másold át az egyik szöveges beviteli mező tartalmát a másikba!
const task6Div = document.querySelector('article#task-6');

// az Element típusú Node-okra is értelmezve van a querySelector
// ekkor a querySelector a dom csak abban a részfában keres melynek gyökere az adott elem amire meghívjuk
// figyeljünk arra, hogy ekkor nyilván a szelektorokat is ezt figyelembe véve kell megadnunk
const input1 = task6Div.querySelector('label input');
const input2 = task6Div.querySelector('label:nth-of-type(2) input');
console.log(input1, input2);
const copyButton = task6Div.querySelector('button');

copyButton.addEventListener('click', () => {
    input2.value = input1.value;
    // value attribútum írható
})

// 7. Egy űrlapon csak akkor kérd be a leánykori nevet, ha nő az illető! Használd a rádiógombok click eseményét!
// A megjelenítéshez, eltűntetéshez használd az elemek hidden tulajdonságát!
const personForm = document.querySelector('form');

const maleButton = personForm.querySelector('input[type="radio"]#male');
const femaleButton = personForm.querySelector('input[type="radio"]#female');
console.log(maleButton, femaleButton);

const maidenNameInput = personForm.querySelector('input#maiden-name');
const maidenNameLabel = personForm.querySelector('label[for="maiden-name"]');
console.log(maidenNameInput, maidenNameLabel);

const toggleMaidenName = () => {
    // hidden tulajdonságon keresztül állítható, hogy megjelenjen-e az adott elem
    maidenNameInput.hidden = maleButton.checked; // checked = rádiógomb ki van-e választva
    maidenNameLabel.hidden = maleButton.checked;
}

maleButton.addEventListener('click', toggleMaidenName);
femaleButton.addEventListener('click', toggleMaidenName);

toggleMaidenName();

// 8. Oldalbetöltéskor listázd ki az oldal összes hiperhivatkozásának a címét!

// querySelectorAll - összes selectornak megfelelő elem kiválasztása
// NodeList-et vissza !EZ NEM EGY TÖMB!
const links = document.querySelectorAll('a');

// bár nem tömb forEach ugyan úgy van (filter viszont már nincs)
links.forEach(({href}) => console.log(href))

// ha mégis tömbműveleteket szeretnénk használni akkor [...links]e- tudunk konvertálni

// 10. Készíts egy számláló komponenst!

let counterValue = 0;

const increment = () => {
    counterValue++;
    counter.innerText = counterValue;
}

const decrement = () => {
    counterValue--;
    counter.innerText = counterValue;
}

const counterDiv = document.createElement('div');

const incrementButton = document.createElement('button');
incrementButton.addEventListener('click', increment)
incrementButton.innerText = '+'
counterDiv.appendChild(incrementButton);

const counter = document.createElement('h3');
counter.innerText = counterValue;
counterDiv.appendChild(counter);

const decrementButton = document.createElement('button');
decrementButton.addEventListener('click', decrement)
decrementButton.innerText = '-'
counterDiv.appendChild(decrementButton);

document.querySelector('#task10').appendChild(counterDiv);

// kicsit ügyesebben enkapszulálva (React inspirált megközelítés)
const Counter = () => {
    let counterValue = 0;

    const increment = () => {
        counterValue++;
        counter.innerText = counterValue;
    }

    const decrement = () => {
        counterValue--;
        counter.innerText = counterValue;
    }

    const counterDiv = document.createElement('div');

    const incrementButton = document.createElement('button');
    incrementButton.addEventListener('click', increment)
    incrementButton.innerText = '+'
    counterDiv.appendChild(incrementButton);

    const counter = document.createElement('h3');
    counter.innerText = counterValue;
    counterDiv.appendChild(counter);

    const decrementButton = document.createElement('button');
    decrementButton.addEventListener('click', decrement)
    decrementButton.innerText = '-'
    counterDiv.appendChild(decrementButton);
    
    return counterDiv;
}
document.querySelector('#task10').appendChild(Counter());

// lehet classal is hasonlót (Custom elements)
class CounterComponent extends HTMLDivElement {
    counterValue;
    counter;

    constructor() {
        super();
        this.counterValue = 0;
        this.counter = document.createElement('h3');
        this.counter.innerText = counterValue;

        const incrementButton = document.createElement('button');
        incrementButton.addEventListener('click', this.#increment)
        incrementButton.innerText = '+'

        const decrementButton = document.createElement('button');
        decrementButton.addEventListener('click', this.#decrement)
        decrementButton.innerText = '-'

        this.appendChild(incrementButton);
        this.appendChild(this.counter);
        this.appendChild(decrementButton);
    }

    // privát 
    #increment = () => {
        this.counterValue++;
        this.counter.innerText = this.counterValue;
    }

    #decrement = () => {
        this.counterValue--;
        this.counter.innerText = this.counterValue;
    }
}

// regisztrálni kell (első paraméter elnevezés fontos, két kötőjellel elválaszott részből kell állnia)
customElements.define('counter-component', CounterComponent, {extends: 'div'});
document.querySelector('#task10').appendChild(new CounterComponent());

// bővebben erről kliensoldali webprogramozás van szó

// 12. Készíts webes alkalmazást kamatos kamat számolására.
// A számoláshoz meg kell adni a kiindulási összeget, a kamat értékét, valamint azt, hány évvel későbbi összegre vagyunk
// kíváncsiak. Minden év végén adjuk hozzá a kamatot a tőkéhez, és a következő évben az képezi a kamatozás alapját.
// A feladat során jelenítsük meg azt is, hogy melyik évben hogyan változik az összeg.
const task12div = document.querySelector('article#task12');
const moneyInput = task12div.querySelector('#money');
const interestInput = task12div.querySelector('#interest');
const yearInput = task12div.querySelector('#year');
const calculateButton = task12div.querySelector('#calculate');
const moneyTableBody = task12div.querySelector('#breakdown').tBodies[0];
// táblázat elemeknek lekérhető a törzse(i) a tBodies mezőn keresztül

console.log(moneyInput, interestInput, yearInput, calculateButton, moneyTableBody);

calculateButton.addEventListener('click', () => {
    let money = Number.parseInt(moneyInput.value, 10);
    const interest = Number.parseFloat(interestInput.value, 10);
    const year = Number.parseInt(yearInput.value, 10);

    if (money && interest && year) {
        // ez is jó tud lenni, ha nem kell mondjuk eseménykezelőket leszedni a gyerekelemekről
        // moneyTableBody.innerText = "";

        while(moneyTableBody.firstChild) {
            moneyTableBody.firstChild.remove();
        }

        for (let index = 0; index <= year; index++) {
            const row = document.createElement('tr');

            row.innerHTML = `<td>${index}</td><td>${money}</td>`; // nyitó és záró tag közti html

            money *= (1 + (interest / 100));

            moneyTableBody.appendChild(row);
        }

    } else {
        console.error('Hibás bementi értékek!');
    }
})

// 14. Adott egy könyvtári nyilvántartás. Egy könyvről a következő adatokat tároljuk:
// szerző cím kiadás éve kiadó ISBN szám
// a. Felületen kérj be egy évszámot, és listázd ki az abban az évben megjelent könyvcímeket!
// b. Készíts egy legördülő mezőt, amelyben az egyes kiadók vannak felsorolva. Egy gombra kattintva táblázatos formában
// jelenítsd meg a kiválasztott kiadóhoz tartozó könyveket!

const books = [
    {
        szerzo: "J.K. Rowling",
        cim: "Harry Potter és a Bölcsek Köve",
        kiadasEve: 1997,
        kiado: "Bloomsbury",
        ISBN: "978-963-8386-65-4"
    },
    {
        szerzo: "George Orwell",
        cim: "1984",
        kiadasEve: 1949,
        kiado: "Secker and Warburg",
        ISBN: "978-0451524935"
    },
    {
        szerzo: "Harper Lee",
        cim: "Ne bántsátok a feketerigót!",
        kiadasEve: 1960,
        kiado: "J. B. Lippincott & Co.",
        ISBN: "978-0061120084"
    },
    {
        szerzo: "Paulo Coelho",
        cim: "The Fifth Mountain",
        kiadasEve: 1997,
        kiado: "HarperOne",
        ISBN: "978-0061723731"
    },
    {
        szerzo: "J.K. Rowling",
        cim: "Harry Potter and the Chamber of Secrets",
        kiadasEve: 1998,
        kiado: "Bloomsbury",
        ISBN: "978-0-7475-3849-0"
    }
];

// a
const filterButton = document.querySelector('button#filter');
const releaseYearInput = document.querySelector('input#release');

filterButton.addEventListener('click', () => {
    const year = Number.parseInt(releaseYearInput.value, 10);
    console.log(year)
    console.log(books.filter(book => book.kiadasEve === year));
})

// b
const selectPublisher = document.querySelector('select#publisher');
const bookTable = document.querySelector('table#books');

// halmaz típus
const publisherSet = new Set();
books.forEach(konyv => {
    publisherSet.add(konyv.kiado);
})

publisherSet.forEach(publisher => {
    const option = document.createElement('option');
    option.value = publisher;
    option.innerText = publisher;
    selectPublisher.appendChild(option);
})

// change - select elem kiválasztott értékének megváltozása
selectPublisher.addEventListener('change', () => {
    while (bookTable.tBodies[0].firstChild) {
        bookTable.tBodies[0].firstChild.remove();
    }

    books.forEach(book => {
        if (book.kiado === selectPublisher.value) {
            const row = document.createElement('tr');
            row.appendChild(document.createElement('td'))
            row.appendChild(document.createElement('td'))
            row.appendChild(document.createElement('td'))
            row.children[0].innerText = book.cim;
            row.children[1].innerText = book.szerzo;
            row.children[2].innerText = book.kiado;
            bookTable.tBodies[0].appendChild(row);
        }
    })
})