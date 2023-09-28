// 03. Eseménykezelés
// feladatsor: http://webprogramozas.inf.elte.hu/#!/subjects/webprog-pti/gyak/03
// előadás: http://webprogramozas.inf.elte.hu/webprog/lectures/03/#/

// HTML elemekre lehetőségünk van eseménykezelőket regisztrálni
// az eseménykezelők figyelnek az adott eseményekre, melyek bekövetkeztekor az általunk megadott alprogramokat
// (függvényeket) futtatják le

// eseménykezelő regisztrálás: element.addEventListener(eventType: string, eventHandler: function);
// eseménykezelő törlés: element.removeEventListener(eventType: string, eventHandler: function);

// sokféle esemény létezik
// click: egérkattintás
// mousemove: egérmozgatás
// mousedown: egér gombjának lenyomása
// mouseup: egér gombjának felenegedése
// input: input mező értékének megváltozása
// keydown: billentyűzet gombjának lenyomása
// keyup: billentyűzet gombjának felengedése
// keypress: billentyűzet gombjának megnyomása
// submit: űrlap elküldése
// scroll: görgetés az oldalon
// https://developer.mozilla.org/en-US/docs/Web/Events

// 1. Adott egy paragrafusbeli szöveg, amelyben néhány szó `span` elembe van foglalva vagy hivatkozásként van megadva.
// A paragrafusra kattintáskor írd ki a konzolra:
// a) az eseményt jelző objektumot;
// b) az esemény típusát;
// c) a kattintás közben lenyomott egérgombot;
// d) az egér kattintáskori pozícióját;
// e) az eseményt eredetileg jelző objektumot;
// f) span elemre kattintva a span elem szövegét.
// g) Ha a hivatkozás szövege "libero", akkor ne kövesse a hivatkozást.

const paragraph = document.querySelector('p#lorem');

paragraph.addEventListener('click', event => {
    console.log(event.target);

    // típus
    console.log(event.type);

    // eseményspecfikius adattagok
    console.log(event.clientX, event.clientY);

    // amire eseménykezelő van
    console.log(event.currentTarget);

    // CSS szelektor
    if (event.target.matches('a') && event.target.innerText === 'libero') {
        event.preventDefault();
    }
})

// 4. Készítsünk egy csak számokat elfogadó mezőt.
// a) Gépelés közben meg se jelenjenek a számoktól eltérő karakterek.
// b) A megoldás működjön minden olyan szöveges beviteli mezőre, amelynek szam stílusosztály be van állítva.

const handleInput = event => {
    const input = event.target;

    if (!(/^d*$/).test(input.value)) {
        input.value = input.value.replace(/[^\d/]/g, '');
    }
}

// document.querySelectorAll('input.szam').forEach(input => input.addEventListener('input', handleInput));

// delegálás

document.addEventListener('input', event => {
    if (event.target.matches('input.szam')) {
        handleInput(event);
    }
})

// 5. Az oldalon minden olyan hivatkozást tiltsunk le, amelyik nem ELTÉs címre mutat!
document.addEventListener('click', event => {
    if (event.target.matches('a')) {
        const link = event.target;

        if (!link.href.includes('.elte.hu')) {
            event.preventDefault();
        }
    }
})

// 11.
// Adott egy GYIK oldal. Ezen egy faq stílusosztályú elemen belül vannak a kérdések válaszok. A kérdések h3 elemben, a 
// válaszok közvetlenül utána p elemekben vannak. Oldjuk meg, hogy egy kérdésre kattintva a válasz eltűnjön/megjelenjen!
const faqDiv = document.querySelector('div.faq');

faqDiv.addEventListener('click', event => {
    if (event.target.matches('h3')) {
        const question = event.target;
        const answer = question.nextElementSibling;

        answer.hidden = !answer.hidden;
    }
})

// 8. Készíts memóriajátékot!

/**
 * Helper function to create the arrangement of cards in the memory game.
 * @param {number} size of of the matrix to create 
 * @returns matrix of cards.
 */
function shuffleCards(size) {
    const cards = Array.from({length: size * size}, (_, index) => (Math.ceil((index + 1) / 2)));
    shuffleArray(cards);

    const cardMatrix = [];
    for (let i = 0; i < cards.length; i += size) {
      cardMatrix.push(cards.slice(i, i + size));
    }

    return cardMatrix;
}

/**
 * Helper function to shuffle the elements of an array.
 * @param {array} array Array to shuffle.
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 6. Valahány mozifilmről tároljuk a címét, megjelenési évét, hosszát és rendezőjét. Mivel sok film is lehet, ezért
// olyan felületet szeretnénk, ahol egy szűrőmezőbe írva csak azok a filmcímek jelennek meg, amelyek tartalmazzák a
// szűrőmezőbe írt szöveget. A kiválasztott filmcím fölé víve az egeret pedig jelenítsük meg az adott film összes
// részletét!

const movies = [
    { title: "A remény rabjai", yearOfRelease: 1994, runtime: 142, director: "Frank Darabont" },
    { title: "A keresztapa", yearOfRelease: 1972, runtime: 175, director: "Francis Ford Coppola" },
    { title: "Ponyvaregény", yearOfRelease: 1994, runtime: 154, director: "Quentin Tarantino" },
    { title: "A sötét lovag", yearOfRelease: 2008, runtime: 152, director: "Christopher Nolan" },
    { title: "Schindler listája", yearOfRelease: 1993, runtime: 195, director: "Steven Spielberg" },
    { title: "Forrest Gump", yearOfRelease: 1994, runtime: 142, director: "Robert Zemeckis" },
    { title: "Eredet", yearOfRelease: 2010, runtime: 148, director: "Christopher Nolan" },
    { title: "A Mátrix", yearOfRelease: 1999, runtime: 136, director: "The Wachowskis" },
    { title: "Avatar", yearOfRelease: 2009, runtime: 162, director: "James Cameron" },
    { title: "A Gyűrűk Ura: A gyűrű szövetsége", yearOfRelease: 2001, runtime: 178, director: "Peter Jackson" }
];