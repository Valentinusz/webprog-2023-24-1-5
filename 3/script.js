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
    // a
    // target az az elem, amivel interaktálva az esemény kiváltásra került
    // nem feltétlen az az elem amihez az eseménykezelő hozzá van adva
    // "Egy esemény bekövetkezte mindig egy adott DOM objektumhoz kapcsolódik. Ezt nevezzük az esemény forrásobjektumának.
    // Azonban az eseményt nemcsak ez az objektum jelzi, hanem annak szülője, majd annak szülője, szép sorban egészen a
    // legfelső szintig a document objektumig. Ezt nevezzük az esemény buborékolásának."
    // - http://webprogramozas.inf.elte.hu/tananyag/kliens/
    console.log(event.target);

    // az esemény típusa, mindig az amit az eseménykezelőnek megadunk
    console.log(event.type);

    // eseményspecifikus adattagok
    console.log(event.clientX, event.clientY);

    // currentTarget mindig az az elem, amihez az eseménykezelő hozzá van adva
    console.log(event.currentTarget);

    // a matches függvénnyel megvizsgálható, hogy az adott elem megfelel-e a megadott CSS szelektornak
    if (event.target.matches('a') && event.target.innerText === 'libero') {
        // bizonyos HTML elemeknek van alapból definiált eseménye (pl. <a>, <form>)
        // az általunk definiált eseménykezelők hamarabb futnak le, ezért az
        // alapértelemezett működés a preventDefault() metódussal megakadályozható
        event.preventDefault();
    }
})

// 4. Készítsünk egy csak számokat elfogadó mezőt.
// a) Gépelés közben meg se jelenjenek a számoktól eltérő karakterek.
// b) A megoldás működjön minden olyan szöveges beviteli mezőre, amelynek szam stílusosztály be van állítva.

const handleInput = event => {
    const input = event.target;

    // minden gépeléskor megvizsgáljuk az input új értéke csak számból áll-e
    // reguláris kifejezés azt nézi, hogy csak tetszőleges számokból áll-e a string
    if (!(/^\d*$/).test(input.value)) {
        // a nem számjegy karaktereket üres stringre cseréljük
        input.value = input.value.replace(/[^\d/]/g, '');
    }
}

// naív megoldás: összes input.szam-ra registrálunk eseménykezelőt
// nem rugalmas, nem hatékony

// document.querySelectorAll('input.szam').forEach(input => input.addEventListener('input', handleInput));

// jobb, de absztraktabb megoldás: delegálás
// A buborékolás miatt megtehetjük azt, hogy a konkrét elem helyett, annak egy szűlőjére regisztrálunk eseménykezelőt,
// majd a függvény törzsében vizsgáljuk meg, ténylegesen a megadott gyerekelem váltotta-e ki az eseményt.
document.addEventListener('input', event => {
    if (event.target.matches('input.szam')) {
        // ezen a ponton biztosak vagyunk benne, hogy az eseményt egy input elem váltotta ki aminek van szam stílusosztálya
        handleInput(event);
    }
})

// 5. Az oldalon minden olyan hivatkozást tiltsunk le, amelyik nem ELTÉs címre mutat!
document.addEventListener('click', event => {
    if (event.target.matches('a')) {
        const link = event.target;

        // includes igaz, ha a stringben megtalálható a megadott substring
        if (!link.href.includes('.elte.hu')) {
            event.preventDefault();
        }
    }
});

// 11.
// Adott egy GYIK oldal. Ezen egy faq stílusosztályú elemen belül vannak a kérdések válaszok. A kérdések h3 elemben, a 
// válaszok közvetlenül utána p elemekben vannak. Oldjuk meg, hogy egy kérdésre kattintva a válasz eltűnjön/megjelenjen!
const faqDiv = document.querySelector('div.faq');

faqDiv.addEventListener('click', event => {
    if (event.target.matches('h3')) {
        const question = event.target;

        // nextElementSibling az adott elem következő Element testvére
        const answer = question.nextElementSibling;

        answer.hidden = !answer.hidden;
    }
});

// 8. Készíts memóriajátékot!
const Memory = size => {
    // Állapottér
    let firstSelectedCard = null;
    let bothFlipped = false;

    // Eseménykezelő
    const handleClick = event => {
        if (event.target.matches('td') && !bothFlipped && !event.target.classList.contains('flipped')) {
            if (firstSelectedCard && !event.target.classList.contains('selected')) {
                bothFlipped = true;
                const secondSelectedCard = event.target;
                secondSelectedCard.innerText = secondSelectedCard.dataset.number;
                secondSelectedCard.classList.add('selected');

                if (firstSelectedCard.dataset.number === secondSelectedCard.dataset.number) {
                    firstSelectedCard.classList.add('flipped');
                    secondSelectedCard.classList.add('flipped');
                }

                setTimeout(() => {
                    firstSelectedCard.classList.remove('selected');
                    secondSelectedCard.classList.remove('selected')
                    firstSelectedCard.innerText = "";
                    secondSelectedCard.innerText = "";
                    firstSelectedCard = null;
                    bothFlipped = false;
                }, 2000)


            } else {
                firstSelectedCard = event.target;
                firstSelectedCard.classList.add('selected');
                firstSelectedCard.innerText = firstSelectedCard.dataset.number;
            }
        }
    }

    // Markup / HTML
    const gameTable = document.createElement('table');
    gameTable.id = 'game';
    gameTable.addEventListener('click', handleClick);

    shuffleCards(4).forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.dataset.number = cell;
            tr.appendChild(td);
        })
        gameTable.appendChild(tr);
    })

    return gameTable;
}

document.querySelector('div#memory').appendChild(Memory(4));


// Element CSS osztályai a classList property-n keresztül érhetőek el
// classList.add('string') osztály hozzáadása
// classList.remove('string') osztály eltávolítása
// classList.toggle('string') osztály hozzáadása ha nincs, eltávolítása, ha van
// classList.includes('string') igaz, ha az elem rendelkezik a stílusosztállyal

// data attribútumok
// saját HTML attribútumok, megadás HTML-ben data-* pl. data-id="1"
// dataset mezőn keresztül érhetőek el
// element.dataset.id = 1; írás
// element.dataset.id; olvasás
// 'id' in element.dataset; attribútom meglétének vizsgálata

const Memory = size => {
    // Állapottér
    let firstSelectedCard = null;
    let bothFlipped = false;

    // Eseménykezelő
    const handleClick = event => {
        if (
            event.target.matches('td') && // td-re kattintunk-e
            !bothFlipped && // várjuk meg a setTimeOut végét
            !event.target.classList.contains('flipped') // amire kattintunk nincs felfordítva
        ) {
            if (firstSelectedCard && !event.target.classList.contains('selected')) {
                bothFlipped = true;
                const secondSelectedCard = event.target;
                secondSelectedCard.innerText = secondSelectedCard.dataset.number;
                secondSelectedCard.classList.add('selected');

                const flipped = firstSelectedCard.dataset.number === secondSelectedCard.dataset.number;
                if (flipped) {
                    firstSelectedCard.classList.add('flipped');
                    secondSelectedCard.classList.add('flipped');
                }

                // setTimeout legalább n milliszekundum-ot vár mielőtt végrehajta a megadott kódot
                // aszinkron, tehát nem blokkol a js fájl végrehajtása folytatódik
                setTimeout(() => {
                    firstSelectedCard.classList.remove('selected');
                    secondSelectedCard.classList.remove('selected')

                    if (!flipped) {
                        firstSelectedCard.innerText = "";
                        secondSelectedCard.innerText = "";
                    }

                    firstSelectedCard = null;
                    bothFlipped = false;
                }, 2000)


            } else {
                firstSelectedCard = event.target;
                firstSelectedCard.classList.add('selected');
                firstSelectedCard.innerText = firstSelectedCard.dataset.number;
            }
        }
    }

    // Markup / HTML
    const gameTable = document.createElement('table');
    gameTable.id = 'game';
    gameTable.addEventListener('click', handleClick);

    shuffleCards(size).forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.dataset.number = cell;
            tr.appendChild(td);
        })
        gameTable.appendChild(tr);
    })

    return gameTable;
}

document.querySelector('div#memory').appendChild(Memory(4));

// SEGÉDFÜGGVÉNYEK

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