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
// CSS szelektorok ismétléséhez ajánlom a CSS Diner (https://flukeout.github.io/) oldalt

console.log(document);
// 1. Egy gomb megnyomására írd ki a dokumentum valamelyik általad választott részére, hogy "Helló világ!"!
const button = document.querySelector('button#greet');
console.log(button);

button.addEventListener('click', () => {
    button.insertAdjacentText('beforeend', 'Helló világ!');
    // button.innerHTML += '<a>Helló világ!</a>'
    // button.innerText += '<a>Helló világ!</a>'
})

// 2. Kérj be egy számot, és annyiszor írd ki egymás alá egyre növekvő betűméretekkel a "Hello világ!" szöveget!
const printButton = document.querySelector('button#print-button');
const countInput = document.querySelector('input#print-count');
const secondTask = document.querySelector('article:nth-of-type(2)');
console.log(printButton, countInput, secondTask);

printButton.addEventListener('click', () => {
    const printCount = Number.parseInt(countInput.value, 10);
    // NaN ha nem szám

    for (let index = 0; index < printCount; index++) {
        const element = document.createElement('h3');
        element.innerText = 'Helló világ!';
        element.style.fontSize = `${1 + 0.25 * index}em`

        // utolsó gyerekként szúrja be
        secondTask.appendChild(element);
    }

    console.log(printCount);
})

// 3. Kérj be egy N számot, és készíts azzal egy NxN-es szorzótáblát!
const size = 10;

const thirdTask = document.querySelector('article:nth-of-type(3)');
console.log(thirdTask);

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

thirdTask.appendChild(table);
// 6. Adott két szöveges beviteli mező és köztük egy gomb.
// A gomb lenyomására másold át az egyik szöveges beviteli mező tartalmát a másikba!
const task6Div = document.querySelector('article#task-6');

const input1 = task6Div.querySelector('label input');
const input2 = task6Div.querySelector('label:nth-of-type(2) input');
console.log(input1, input2);
const copyButton = task6Div.querySelector('button');

copyButton.addEventListener('click', () => {
    input2.value = input1.value
})

// 7. Egy űrlapon csak akkor kérd be a leánykori nevet, ha nő az illető! Használd a rádiógombok click eseményét!
// A megjelenítéshez, eltűntetéshez használd az elemek hidden tulajdonságát!

// 8. Oldalbetöltéskor listázd ki az oldal összes hiperhivatkozásának a címét!
const links = document.querySelectorAll('a');
links.forEach(({href}) => console.log(href))

// 10. Készíts egy számláló komponenst! (number input és egy csökkentő növelő gomb)
let value = 0;

const counterDiv = document.createElement('div');
const incButton = document.createElement('button');
incButton.innerText = '+';

const decButton = document.createElement('button');
decButton.innerText = '-';

const counter = document.createElement('h3');
counter.innerText = value;

const plus = () => {
    value++;
    counter.innerText = value;
}
const minus = () => {
    value--;
    counter.innerText = value;
}

incButton.addEventListener('click', plus);
decButton.addEventListener('click', minus);

counterDiv.appendChild(decButton);
counterDiv.appendChild(counter);
counterDiv.appendChild(incButton);

document.querySelector('#task10').appendChild(counterDiv)

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

console.log(moneyInput, interestInput, yearInput, calculateButton, moneyTableBody);

calculateButton.addEventListener('click', () => {
    let money = Number.parseInt(moneyInput.value, 10);
    const interest = Number.parseFloat(interestInput.value, 10);
    const year = Number.parseInt(yearInput.value, 10);

    if (money && interest && year) {
        //moneyTableBody.innerText = "";

        while(moneyTableBody.firstChild) {
            moneyTableBody.firstChild.remove();
        }

        for (let index = 0; index <= year; index++) {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${index}</td><td>${money}</td>`;
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