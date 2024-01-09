const inputNumberOfDefenders = document.querySelector("#numberOfDefenders");
const buttonStart = document.querySelector("#buttonStart");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const ballImage = new Image();
const defenderImage = new Image();
ballImage.src = "ball.png";
defenderImage.src = "defender.png";

// Canvas alapú játék ismétlés
// canvas origó (0,0) bal felső sarok
// minden kirajzolás a bal felső saroktól indul
// így jobb alsó sarok (x koordináta + szélesség, y koordináta + magasság) 
// requestAnimationFrame(callback)
// egy függvényt, melynek paramétereként átadja az aktuális időt
// a függvény grafikai hatását a következő újrarajzolás előtt kirajzolja
// időalapú: minden animációs ciklus iterációban kiszámítjuk mennyi idő telt el az előző ciklus és a jelenlegi kezdete
// között, ez lesz a dt azaz delta time
// megfelelő fizikai képletek felhasznásával frissítjük a kirajzolt objektumok pozícióit
// x += sebesség * idő
// sebesség += gyorsulás * delta time
// az objektumok ütközését az isCollision segédfüggvénnyel tudjuk vizsgálni
// ez két olyan objektumot vár, melyben létezik x, y, width, height adattagok


// Állapottér
let state = 0; // 0 begin, 1 ingame, 2 lost, 3 won 

// labda
const ball = {
    x: 30,
    y: canvasHeight / 2 - 8,
    width: 15,
    height: 15,
    vx: 0,
    ax: 0,
};

// kapu
const gate = {
    x: canvasWidth - 40,
    y: canvasHeight / 2 - 40,
    width: 40,
    height: 80,
};

// védők tömbje
let defenders;

// animáció működtetéséhez kell
let lastFrameTime; 

// változók inicializálása játék indítása
function start() {
    // alapértelmezett értékek
    ball.x = 30;
    ball.vx = 0;
    ball.ax = 0;

    // f, i
    // védők
    const numberOfDefenders = Number.parseInt(inputNumberOfDefenders.value, 10);
    defenders = [];

    // n+2 részre osztjuk a pályát elsőben kezd a labda n+2-ben van a kapu
    const distanceBetweenDefenders = canvasWidth / (numberOfDefenders + 2);

    // első részbe nem rakunk védőt ezért 1-ről indítjuk
    for (let areaCount = 1; areaCount <= numberOfDefenders; areaCount++) {
        defenders.push({
            x: areaCount * distanceBetweenDefenders,
            y: random(80, canvasHeight - 80),
            // random irány [0,1] - 2
            vy: (random(0,1)-2) * random(150, 250),
            width: 40,
            height: 80
        });
    }

    // játék indítása
    state = 1;
    lastFrameTime = performance.now();

    next();
}



// a,
// játékindítás
buttonStart.addEventListener('click', () => {
    // ha megy a játék ne engedjük újraindítani
    if (state !== 1) {
        start();
    }
});



// c, d,
document.addEventListener('keypress', () => {
    // csak ha megy a játék
    if (state === 1) {
        ball.vx = 300;
        ball.ax = -50;
    }
})

function next(currentTime = performance.now()) {
    const deltaTime = (currentTime - lastFrameTime) / 1000; // átváltás másodpercbe
    lastFrameTime = currentTime; // előző időbélyeg frissítése
    update(deltaTime); // állapotváltozások
    render(); // újrarajzolás

    // e, 
    if (state === 1) {
        requestAnimationFrame(next);
    }
}

function update(dt) {
    // labda pozíció
    ball.x += dt * ball.vx;

    // labda gyorsulás
    ball.vx += dt * ball.ax;

    // védők frissítése
    defenders.forEach(defender => {
        // y frissítése
        defender.y += dt * defender.vy;

        // ha közel van a pálya széléhez invertáljuk a sebességet
        // aljához ér
        // a sebesség irány feltétel azért kell mert különben egyből invertálna újra
        if (defender.y < 0 && defender.vy < 0) {
            defender.vy *= -1;
        }
        
        // tetejéhez ér
        // rá kell sázmolni a magasságot, mert a bal felső sarok a saját origó
        if (defender.y + defender.height > canvasHeight && defender.vy > 0) {
            defender.vy *= -1;
        }
    });

    // e, teljesen kapuban = labda legbaloldalibb pixele is már a kapuba
    if (ball.x > gate.x) {
        state = 3;
    } else if (defenders.some(defender => isCollision(defender, ball))) {
        // h, ha bármely védőt metsz a labda akkor vesztettünk
        state = 2;
    }
}

function render() {
    // korábbi dolgok törlése
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // a,
    // kép kirajzolás
    ctx.drawImage(ballImage, ball.x, ball.y, ball.width, ball.height);

    // b,
    // kitöltési szín
    ctx.fillStyle = "#d2d2d280"; // ezt hogy kellett volna tudni zh közbe

    // kapu kitöltése
    ctx.fillRect(gate.x, gate.y, gate.width, gate.height);

    // védők
    defenders.forEach(defender => ctx.drawImage(defenderImage, defender.x, defender.y, defender.width, defender.height))
}

// =============== Segédfüggvények =================
function isCollision(box1, box2) {
    return !(
        box2.y + box2.height < box1.y ||
        box1.x + box1.width < box2.x ||
        box1.y + box1.height < box2.y ||
        box2.x + box2.width < box1.x
    );
}

const random = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
