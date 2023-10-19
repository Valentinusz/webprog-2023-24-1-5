// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

function random(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

const canvas = document.querySelector('#game');

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

const bg = Object.assign(new Image(), {src: 'assets/bg.png'})

const scoreDiv = document.querySelector('#score');
const startButton = document.querySelector('#start');

/**
 * @abstract
 */
class CanvasEntity {
    x;
    y;
    width;
    height;
    image;
    ctx;

    constructor(x, y, width, height, image, ctx) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
        this.ctx = ctx;
    }

    render() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }

    /**
     * @abstract
     */
    move(deltaTime) {
        console.error("CanvasEntity should not be instansiated");
    }

    /**
     * @abstract
     * @return {boolean}
     */
    isOutOfBounds() {
        console.error("CanvasEntity should not be instansiated");
    }

    /**
     *
     * @param {CanvasEntity} otherEntity
     * @return {boolean}
     */
    isColliding(otherEntity) {
        return !(
            otherEntity.y + otherEntity.height < this.y ||
            this.x + this.width < otherEntity.x ||
            this.y + this.height < otherEntity.y ||
            otherEntity.x + otherEntity.width < this.x
        );
    }
}

class Bird extends CanvasEntity {
    static birdImage = Object.assign(new Image(), {src: 'assets/bird.png'})

    constructor(x, y, ctx) {
        super(x, y, 50, 30, Bird.birdImage, ctx);
        this.speed = 0;
        this.acceleration = 250;
    }

    move(deltaTime) {
        this.speed += deltaTime * this.acceleration;
        this.y += deltaTime * this.speed;
    }

    flapWings() {
        this.speed -= 250;
    }

    isOutOfBounds() {
        return this.y < 0 || this.y > ctx.canvas.height;
    }
}

class Obstacle extends CanvasEntity {
    static OBSTACLE_GAP = 150;
    static OBSTACLE_SPEED = -200;
    static columnImage = Object.assign(new Image(), {src: 'assets/column.png'});

    constructor(x, y, height, ctx) {
        super(x, y, 50, height, Obstacle.columnImage, ctx);
    }

    move(deltaTime) {
        this.x += deltaTime * Obstacle.OBSTACLE_SPEED;
    }

    static makeObstaclePair(ctx) {
        const firstHeight = random(100, ctx.canvas.height / 2);
        const secondHeight = ctx.canvas.height - firstHeight - this.OBSTACLE_GAP;

        const firstObstacle = new Obstacle(400, 0, firstHeight, ctx);
        const secondObstacle = new Obstacle(400, firstHeight + this.OBSTACLE_GAP, secondHeight, ctx);

        return [firstObstacle, secondObstacle];
    }

    isOutOfBounds() {
        return this.x < 0;
    }
}

// ÁLLAPOTTÉR

let bird;
let previousTime;
let obstacles;
let score;
let isGameOver = true;

function start() {
    bird = new Bird(50, ctx.canvas.height / 2, ctx);
    previousTime = performance.now();
    obstacles = Obstacle.makeObstaclePair(ctx);
    score = 0;
    isGameOver = false;

    scoreDiv.innerText = 0;

    requestAnimationFrame(update)
}

/**
 *
 * @param {DOMHighResTimeStamp} timeStamp
 */
function update(timeStamp) {
    // állapottér
    let deltaTime = (timeStamp - previousTime) / 1000;
    previousTime = timeStamp;
    bird.move(deltaTime);

    obstacles.forEach(obstacle => obstacle.move(deltaTime));

    isGameOver = bird.isOutOfBounds() || bird.isColliding(obstacles[0]) || bird.isColliding(obstacles[1]);

    if (obstacles[0].isOutOfBounds()) {
        score++;
        obstacles = Obstacle.makeObstaclePair(ctx);
    }

    // megjelenés
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)
    bird.render();
    obstacles.forEach(obstacle => obstacle.render())
    scoreDiv.innerText = score;
    //

    if (isGameOver) {
        console.table(getHighScores());
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
    startButton.blur();
    start()
})
