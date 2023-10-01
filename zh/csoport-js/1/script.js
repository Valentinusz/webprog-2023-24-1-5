const numbers = [5, 2, 15, -3, 6, -8, -2];

const matrix = [
    [1, 0, 3],
    [0, 2, 0],
    [4, 5, 6],
    [0, 0, 0],
]

const searchResults = {
    "Search": [
        {
            "Title": "The Hobbit: An Unexpected Journey",
            "Year": "2012",
            "imdbID": "tt0903624",
            "Type": "movie"
        },
        {
            "Title": "The Hobbit: The Desolation of Smaug",
            "Year": "2013",
            "imdbID": "tt1170358",
            "Type": "movie"
        },
        {
            "Title": "The Hobbit: The Battle of the Five Armies",
            "Year": "2014",
            "imdbID": "tt2310332",
            "Type": "movie"
        },
        {
            "Title": "The Hobbit",
            "Year": "1977",
            "imdbID": "tt0077687",
            "Type": "movie"
        },
        {
            "Title": "Lego the Hobbit: The Video Game",
            "Year": "2014",
            "imdbID": "tt3584562",
            "Type": "game"
        },
        {
            "Title": "The Hobbit",
            "Year": "1966",
            "imdbID": "tt1686804",
            "Type": "movie"
        },
        {
            "Title": "The Hobbit",
            "Year": "2003",
            "imdbID": "tt0395578",
            "Type": "game"
        },
        {
            "Title": "A Day in the Life of a Hobbit",
            "Year": "2002",
            "imdbID": "tt0473467",
            "Type": "movie"
        },
        {
            "Title": "The Hobbit: An Unexpected Journey - The Company of Thorin",
            "Year": "2013",
            "imdbID": "tt3345514",
            "Type": "movie"
        },
        {
            "Title": "The Hobbit: The Swedolation of Smaug",
            "Year": "2014",
            "imdbID": "tt4171362",
            "Type": "movie"
        }
    ],
    "totalResults": "51",
    "Response": "True"
}

// A numbers tömb mindegyik eleméhez rendeld hozzá a négyzetét! (0,5 pont)
console.log(
    numbers.map(number => number ** 2)
)

// Keresd ki a numbers tömb legkisebb elemét! (Ha kell, használhatod az Infinity értéket JavaScriptben.) (0,5 pont)

console.log(
    numbers.reduce((min, curr) => curr < min ? curr : min, Infinity)
)

console.log(
    Math.min(...numbers)
)

// ha nem legalább 1 hosszú a tömb TypeError
console.log(
    numbers.reduce((min, curr) => curr < min ? curr : min)
)

// Add meg a matrix mátrixnak azt a sorindexét, amelyben csupa 0 érték van! Ha nincs ilyen, -1-et adj vissza! (1 pont)

console.log(
    matrix.findIndex(row => row.every(number => number === 0))
)

// Add vissza azokat az IMDB azonosítókat (imdbID) a searchResults nevű mozikeresési eredményből,
// amelyek olyan filmekhez tartoznak, amelyek 2010 utániak (Year mező) és a típusuk (Type) movie. (1 pont)

console.log(
    searchResults.Search.filter(result => result.Type === 'movie' && result.Year > 2010).map(result => result.imdbID)
)

// 2
const form = document.querySelector('form');
const hueInput = form.querySelector('input');
const saturationInput = form.querySelector('input:nth-of-type(2)');
const lightnessInput = form.querySelector('input:nth-of-type(3)');
const hslStringOutput = form.querySelector('input[type=text]');
const colorButton = form.querySelector('button');

// A gombra kattintva írd ki a generált hsl CSS színkódot a "HSL string" szöveg utáni szöveges beviteli mezőbe! (1 pont)
// A gombra kattintva állítsd be az oldal háttérszínét a kiválasztott értékeknek megfelelően! (1 pont)

const handleInput = () => {
    const hslString = `hsl(${hueInput.value}, ${saturationInput.value}%, ${lightnessInput.value}%)`;
    hslStringOutput.value = hslString;
    document.body.style.backgroundColor = hslString;
}

colorButton.addEventListener('click', handleInput)

// Oldd meg, hogy ne csak a gombra, hanem a slidereket húzogatva azonnal változzon meg a háttérszín! Technikai
// segítség: használd a sliderek input eseményét! (1 pont)

form.addEventListener('input', event => {
    if (event.target.matches('input[type=range]')) {
        handleInput();
    }
})

// Írd ki a konzolra a kattintott gomb feliratát és data-toggle értékét! (1 pont)

document.querySelector('#contacts').addEventListener('click', evt => {
    if (evt.target.matches('button')) {
        const button = evt.target;
        console.log(button.dataset.toggle);

        const parentSection = button.closest('section');

        console.log(
            parentSection.querySelector('p.name').innerText
        )
        // c. Bármelyik gombra kattintva tedd láthatóvá az adott kontakt email mezőjét! (1 pont)
        // d. Egy gombra kattintva tedd láthatóvá azt a mezőt, amely a gomb data-toggle értékében van megadva! (1 pont)

        const toReveal = parentSection.querySelector(`p.${button.dataset.toggle}`);
        toReveal.hidden = !toReveal.hidden;
    }
})
