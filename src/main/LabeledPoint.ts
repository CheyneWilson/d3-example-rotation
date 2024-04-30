import {Vector2} from "geometry-lib";

interface PointRef {
    location: Vector2
}

class LabeledPoint implements PointRef {
    location: Vector2
    text: string | null
    offsetX: string
    offsetY: string

    /**
     * Construct a point with an associated text label.
     *
     * @param x The x-coordinate of the point
     * @param y The y-coordinate of the point
     * @param text The label text
     * @param offsetX Offset the label along the x-axis. Used to set the 'dx' attribute. Defaults to ".2em"
     * @param offsetY Offset the label along the y-axis. Used to set the 'dy' attribute. Defaults to "-.2em"
     */
    constructor(x: number, y: number, text: string | null = null, offsetX: string = ".2em", offsetY: string = "-.2em") {
        this.location = new Vector2(x, y)
        this.text = text
        this.offsetX = offsetX
        this.offsetY = offsetY
    }
}

export { LabeledPoint, type PointRef }
