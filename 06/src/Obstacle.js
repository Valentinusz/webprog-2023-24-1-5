import {CanvasEntity} from "./CanvasEntity.js";
import {random} from "./utils.js";

/**
 * Class representing the column obstacles in the game.
 */
export class Obstacle extends CanvasEntity {
    /**
     * Vertical gap between obstacles.
     * @type {number}
     */
    static OBSTACLE_GAP = 150;

    /**
     * Speed of the obstacles.
     * @type {number}
     */
    static OBSTACLE_SPEED = -200;

    /**
     * Image used when displaying obstacles.
     * @type {HTMLImageElement}
     */
    static OBSTACLE_IMAGE = Object.assign(new Image(), {src: 'assets/column.png'});

    /**
     * @constructor
     * @param x {number} x coordinate of the obstacle.
     * @param y {number} y coordinate of the obstacle.
     * @param height {number} height of the obstacle.
     * @param ctx {CanvasRenderingContext2D} context of the canvas the obstacle will be displayed on.
     */
    constructor(x, y, height, ctx) {
        super(x, y, 50, height, Obstacle.OBSTACLE_IMAGE, ctx);
    }

    /**
     * Updates the position of the obstacle on the x-axis.
     * @param deltaTime {number} change of time since last frame.
     */
    move(deltaTime) {
        this.x += deltaTime * Obstacle.OBSTACLE_SPEED;
    }

    /**
     * Checks if the column is out of bounds, meaning it has left the canvas area to the left.
     * @returns {boolean}
     */
    isOutOfBounds() {
        return this.x < 0;
    }

    /**
     * Creates an array containing two obstacles, with a fixed gap between them.
     *
     * @param ctx {CanvasRenderingContext2D} canvas context to create obstacles for.
     * @returns {Obstacle[]}
     */
    static makeObstaclePair(ctx) {
        const firstHeight = random(75, ctx.canvas.height / 2);
        const secondHeight = ctx.canvas.height - firstHeight - Obstacle.OBSTACLE_GAP;

        const firstObstacle = new Obstacle(400, 0, firstHeight, ctx);
        const secondObstacle = new Obstacle(400, firstHeight + Obstacle.OBSTACLE_GAP, secondHeight, ctx);

        return [firstObstacle, secondObstacle];
    }
}
