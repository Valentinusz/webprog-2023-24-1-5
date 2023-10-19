// JS-be nincs absztrakt, JavaDoc a fejlesztői környezetnek mondja csak meg, hogy ez absztrakt így az IDE hibát fog jelezni
/**
 * Class representing an entity on the game canvas.
 * @abstract
 */
export class CanvasEntity {
    /**
     * @constructor
     * @param x {number} x coordinate of the entity.
     * @param y {number} y coordinate of the entity.
     * @param width {number} width of the entity's hitbox.
     * @param height {number} height of the entity's hitbox.
     * @param image {HTMLImageElement} image element used as the sprite of the entity.
     * @param ctx {CanvasRenderingContext2D} context of the canvas the entity will be displayed on.
     */
    constructor(x, y, width, height, image, ctx) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
        this.ctx = ctx;
    }

    /**
     * Draws the entity on the canvas of ctx.
     */
    render() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }

    /**
     * Updates the position of the obstacle on the x-axis.
     * @abstract
     * @param deltaTime {number} change of time since last frame.
     */
    move(deltaTime) {
        console.error("CanvasEntity should not be instantiated!");
    }

    /**
     * Returns whether the entity is out of bounds.
     * @abstract
     * @return {boolean}
     */
    isOutOfBounds() {
        console.error("CanvasEntity should not be instantiated!");
    }

    /**
     * Checks if the entity is colliding with another entity.
     *
     * @param {CanvasEntity} otherEntity colliding entity to check.
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
