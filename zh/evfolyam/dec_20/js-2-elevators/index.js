const divMap = document.querySelector("#map");
const divInformation = document.querySelector("#information");
const divLines = document.querySelector("#lines");

const formNewLine = document.querySelector("#new-line-form");
const inputNewName = document.querySelector("#new-name");
const inputNewX1 = document.querySelector("#new-x1");
const inputNewY1 = document.querySelector("#new-y1");
const inputNewX2 = document.querySelector("#new-x2");
const inputNewY2 = document.querySelector("#new-y2");
const buttonSelect = document.querySelector("#select");

const inputSelectedName = document.querySelector("#selected-name");
const buttonStart = document.querySelector("#start");
const buttonAutomatic = document.querySelector("#automatic");

const lines = [
    {
        name: "Line1",
        stations: [
            { x: 31.344086751431767, y: 73.14579827087277 },
            { x: 6.860215301632762, y: 45.750359578024494 },
        ],
        activeStation: 0,
        elevatorState: "waiting", // "travelling"
        travelTime: 3,
        waitingTime: 10,
        startTime: -Infinity,
        automatic: false,
        waitProgress: 0
    },
    {
        name: "Line2",
        stations: [
            { x: 48.9677430123982, y: 72.93667278466782 },
            { x: 63.98924868449711, y: 28.602069709218696 },
        ],
        activeStation: 0,
        elevatorState: "waiting", // "travelling"
        travelTime: 10,
        waitingTime: 5,
        startTime: -Infinity,
        automatic: false,
        waitProgress: 0
    },
    {
        name: "Line3",
        stations: [
            { x: 31.935484612538023, y: 72.51842181225793 },
            { x: 21.645161829289165, y: 40.31309693669583 },
        ],
        activeStation: 0,
        elevatorState: "waiting",
        travelTime: 8,
        waitingTime: 15,
        startTime: -Infinity,
        automatic: false,
        waitProgress: 0
    },
];

// ez egy nagyon érdekes feladat, de önmagában kb egy zh részvétem, hogy ezt kiadtuk
// undorodom a saját megoldásomtól is
// össze vissza van kombinálva a deklaratív meg imperatív megközelítés, mert a CSS mozgatás miatt nincs eltárolva
// hol vannak a liftek ezért nem lehet csak úgy eldobni :)
// a,
function updateLinesInformationDiv(lines) {
    divInformation.innerHTML = "";
    lines.forEach(line => {
        divInformation.innerHTML += `
            <div class="status">
                ${line.name}: ${line.elevatorState}
                <progress value="${line.waitProgress}" max="10"></progress>
            </div>
        `;
    });
}

updateLinesInformationDiv(lines)

function renderLine(line) {
    // top y%: a pozíció a bal felső és a bal alsó sarkot összekötő szakasz y%-ánál van
    // left x%: a pozíció a bal felső és a jobb felső sarkot összekötő szakasz x%-ánál van
    // mértékegységekre figyelni!

    divLines.innerHTML += `
        <div class="line" data-name="${line.name}">
            <div class="station" style="top: ${line.stations[0].y}%; left: ${line.stations[0].x}%"></div>
            <div class="station" style="top: ${line.stations[1].y}%; left: ${line.stations[1].x}%"></div>
            <div class="elevator"
                style="top: ${line.stations[line.activeStation].y}%; left: ${line.stations[line.activeStation].x}%;
                transition-duration: ${line.travelTime}s;">
            </div>
        </div> `;
}

// b,
lines.forEach(renderLine);


// c,
// delegálni kell
divLines.addEventListener('click', event => {
    // ha nem felvonóra vagy állomásra kattintunk akkor nem csinálunk semmit
    /** @var {MouseEvent} event */
    if (!event.target.classList.contains("station") && !event.target.classList.contains("elevator")) {
        return;
    }
    /** @var {HTMLDivElement} */
    const line = event.target.parentElement; // szülő elem elérése

    console.log(line);

    // input mező értékének írása value-n keresztül
    // data attribútumok elérése: dataset
    inputSelectedName.value = line.dataset.name;

    buttonAutomatic.innerText = `Automatic ${line.automatic ? 'off' : 'on'}`;
});



// d,
const findLine = lineName => lines.find(line => line.name === lineName);

buttonStart.addEventListener('click', () => {
    // input kiolvasása
    const lineName = inputSelectedName.value;

    // ha üres az input ne csináljunk semmit
    if (!lineName) {
        return;
    }
 
    doTravel(findLine(lineName))
})



// d, e, f,
function doTravel(line) {
    // állapot frissítése
    line.activeStation = (line.activeStation === 0) ? 1 : 0;
    line.elevatorState = "travelling";
    updateLinesInformationDiv(lines);

    // dom objektum
    const lineElevatorDiv = divLines.querySelector(`div.line[data-name="${line.name}"] > div.elevator`);
    console.log(lineElevatorDiv);

    // dom objektum frissítése
    // MÉRTÉKEGYSÉG!!!!
    lineElevatorDiv.style.top = `${line.stations[line.activeStation].y}%`;
    lineElevatorDiv.style.left = `${line.stations[line.activeStation].x}%`;

    // kód késleltett végrehajtása: setTimeOut()
    setTimeout(() => {
        line.elevatorState = "waiting";
        updateLinesInformationDiv(lines);
        // Date.now() ezredmásodpercben adja vissza
        line.startTime = Date.now() + line.waitingTime * 1000;

        // a várakozási idő tárolására bevezetek mindent vonalhoz egy plusz változót a waitProgress-t
        

        // az automatikus felvonók miután elindultak folyamatosan mennek, tehát miután odaért az következő állomáshoz
        // waitingTime időt vár majd elindul vissza
        // ez a folyamat rekurzívan ismétlődik, amíg az automatic módot ki nem kapcsoljuk
        if (line.automatic) {
            // 10 része van a progress elemnek amin jelölni akarunk, ezért
            // (waitingTime / 10) * 1000 = waitingTime * 100 ezredmásodpercenként fogunk ismételni
            // erre van a setInterval, aminek visszatérést ha kimentjük változóba majd meg tudjuk állítani
            const timer = setInterval(() => {
                line.waitProgress++;
                console.log(line.waitProgress);
                updateLinesInformationDiv(lines);
            }, line.waitingTime * 100);

            setTimeout(() => {
                // clearnInterval leállítja az ismétlődő hívásokat
                clearInterval(timer)
                line.waitProgress = 0;
                updateLinesInformationDiv(lines);
                doTravel(line)
            }, line.waitingTime * 1000);
        }
        
    }, line.travelTime * 1000);
    // ezredmásodpercben kell megadni
}

buttonAutomatic.addEventListener('click', () => {
    // input kiolvasása
    const lineName = inputSelectedName.value;

    // ha üres az input ne csináljunk semmit
    if (!lineName) {
        return;
    }

    const line = findLine(lineName);

    // toggle automatic
    line.automatic = !line.automatic

    // update button text
    buttonAutomatic.innerText = `Automatic ${line.automatic ? 'off' : 'on'}`;

    doTravel(line);
})



// g, és még ilyen kattintós csoda is kell

let selectActive = false;
let x1 = null;
let x2 = null;
let y1 = null;
let y2 = null;

buttonSelect.addEventListener('click', () => selectActive = !selectActive);

function getPosition(event) {
    // egér elemen belüli koordinátáját adja vissza százalékosan
    // százalékba kell szóval még osztani is kell

    // elemet körülíró négyzet
    const bound = divMap.getBoundingClientRect();

    return [
        // clientX esemény X koordinátája
        // kivonással tudjuk garantálni hogy az elemen belüli lesz a koordináta
        // ezt leosztjuk befoglaló négyzet jobb és alsó koordinátájával és átszámoljuk százalékba
        (event.clientX - bound.left) / (bound.right - bound.left) * 100,
        (event.clientY - bound.top) / (bound.bottom - bound.top) * 100
    ];
}

divMap.addEventListener('click', event => {
    if (!selectActive) {
        return;
    }

    if (x1 && y1) {
        [x2, y2] = getPosition(event);
        inputNewX2.value = x2;
        inputNewY2.value = y2;
    } else {
        console.log("asd");
        [x1, y1] = getPosition(event);
        inputNewX1.value = x1;
        inputNewY1.value = y1;
    }
});

const saveButton = formNewLine.lastElementChild;

saveButton.addEventListener('click', () => {
    if (!inputNewName.value || !x1 || !y1 || !x2 || !y2) {
        return;
    }

    const newLine = {
        name: inputNewName.value,
        stations: [
            { x: x1, y: y1 },
            { x: x2, y: y2 },
        ],
        activeStation: 0,
        elevatorState: "waiting",
        travelTime: 10,
        waitingTime: 10,
        startTime: -Infinity,
        automatic: false,
        waitProgress: 0
    };

    lines.push(newLine);
    renderLine(newLine);

    selectActive = false;
    x1 = null;
    x2 = null;
    y1 = null;
    y2 = null;

    inputNewX1.value = x1;
    inputNewY1.value = y1;
    inputNewX2.value = x2;
    inputNewY2.value = y2;
});

// jézusom
