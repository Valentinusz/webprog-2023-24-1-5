// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
import {Bird} from "./src/Bird.js";
import {Obstacle} from "./src/Obstacle.js";
import {saveScore} from "./src/saveScore.js";

/** @type {CanvasRenderingContext2D} */
const ctx = document.querySelector('#game').getContext('2d');

const bg = Object.assign(new Image(), {src: 'assets/bg.png'})

const scoreDiv = document.querySelector('#score');
const startButton = document.querySelector('#start');

// ÁLLAPOTTÉR
let bird;
let previousTime;
let obstacles;
let score;
let isGameOver = true;

/**
 * Sets the default values of the variables used by the game and starts the game loop.
 */
function start() {
    bird = new Bird(50, ctx.canvas.height / 2, ctx);
    previousTime = performance.now();
    obstacles = Obstacle.makeObstaclePair(ctx);
    score = 0;
    isGameOver = false;

    scoreDiv.innerText = 0;

    // requestAnimationFrame meghívja a megadott függvényt, a következő felület újrarajzolás előtt
    // átad neki egy DOMHighResTimeStamp-et
    requestAnimationFrame(update)
}

/**
 * Updates the state and display of the game.
 * @param {DOMHighResTimeStamp} timeStamp
 */
function update(timeStamp) {
    let deltaTime = (timeStamp - previousTime) / 1000;

    // állapottér
    previousTime = timeStamp;
    bird.move(deltaTime);
    obstacles.forEach(obstacle => obstacle.move(deltaTime));
    isGameOver = bird.isOutOfBounds() || bird.isColliding(obstacles[0]) || bird.isColliding(obstacles[1]);

    if (obstacles[0].isOutOfBounds()) {
        // elég csak az egyik oszlopt vizsgálni
        score++;
        obstacles = Obstacle.makeObstaclePair(ctx);
    }

    // megjelenés
    ctx.drawImage(bg, 0, 0, ctx.canvas.width, ctx.canvas.height)
    bird.render();
    obstacles.forEach(obstacle => obstacle.render())
    scoreDiv.innerText = score;

    // ciklus
    if (isGameOver) {
        console.table(saveScore(score));
    } else {
        requestAnimationFrame(update)
    }
}

document.addEventListener('keyup', event => {
    if (!isGameOver && event.code === 'Space') {
        bird.flapWings();
    }
})

startButton.addEventListener('click', () => {
    startButton.blur(); // fókusz elvétele a gombtól
    start();
})
