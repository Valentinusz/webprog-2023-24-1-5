import {CanvasEntity} from "./CanvasEntity.js";

/**
 * Class representing the bird in the game.
 */
export class Bird extends CanvasEntity {
    /**
     * Image used when displaying birds.
     * @type {HTMLImageElement}
     */
    static BIRD_IMAGE = Object.assign(new Image(), {src: 'assets/bird.png'})

    /**
     * @constructor
     * @param ctx {CanvasRenderingContext2D} context of the canvas the entity will be displayed on.
     * @param x {number} x coordinate of the bird.
     * @param y {number} y coordinate of the bird.
     */
    constructor(x, y, ctx) {
        super(x, y, 50, 30, Bird.BIRD_IMAGE, ctx);
        this.speed = 0;
        this.acceleration = 250;
    }

    /**
     * Updates the position of the bird on the y-axis and changes its velocity based on its acceleration.
     * @param deltaTime {number} change of time since last frame.
     */
    move(deltaTime) {
        this.speed += deltaTime * this.acceleration;
        this.y += deltaTime * this.speed;
    }

    /**
     * Changes the vertical speed of the bird.
     */
    flapWings() {
        this.speed -= 250;
    }

    /**
     * Checks if the bird is out of bounds. Since the bird can only move vertically only vertical checks are made.
     * @returns {boolean}
     */
    isOutOfBounds() {
        return this.y < 0 || this.y > this.ctx.canvas.height;
    }
}
