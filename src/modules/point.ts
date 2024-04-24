import {Vector2, add, angle, distance, length, subtract} from 'geometry-lib'

type LabeledPoint = Vector2 & {
    text: string | null
    // For look & feel from the original point
    offsetX: string
    offsetY: string
}


/**
 * Construct a point with an associated text label.
 *
 * @param x The x-coordinate of the point
 * @param y The y-coordinate of the point
 * @param text The label text
 * @param offsetX Offset the label along the x-axis. Used to set the 'dx' attribute. Defaults to ".2em"
 * @param offsetY Offset the label along the y-axis. Used to set the 'dy' attribute. Defaults to "-.2em"
 */
function create(x: number,
                y: number,
                text: string | null = null,
                offsetX: string = ".2em",
                offsetY: string = "-.2em"): LabeledPoint {
    return {x, y, text, offsetX, offsetY}
}


/**
 * Construct a point with an associated text label from polar coordinates.
 *
 * @param length The length of a vector from the origin to the point
 * @param angle The angle between the positive x-axis and the point
 * @param text The label of the new point
 * @param offsetX Offset the label along the x-axis. Used to set the 'dx' attribute. Defaults to ".2em"
 * @param offsetY Offset the label along the y-axis. Used to set the 'dy' attribute. Defaults to "-.2em"
 */
function fromPolar(length: number,
                   angle: number,
                   text: string | null = null,
                   offsetX: string = ".2em",
                   offsetY: string = "-.2em"): LabeledPoint {
    let x = length * Math.cos(angle)
    let y = length * Math.sin(angle)
    return {x, y, text, offsetX, offsetY}
}

export {fromPolar, create, add, angle, distance, subtract, length}
export type {LabeledPoint, Vector2}
