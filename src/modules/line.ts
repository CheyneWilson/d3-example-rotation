import {Vector2} from 'geometry-lib'

type Line = {
    start: Vector2
    end: Vector2
    classes: string[],
    rotatable: boolean
}

/**
 * Create a new line between two points
 *
 * @param start     The origin of the line
 * @param end       The destination of the line
 * @param classes   CSS classes to style the line with
 * @param rotatable When true, allow the line to be rotated around the start point
 */
function create(start: Vector2, end: Vector2, classes: string[] = [], rotatable: boolean = false): Line {
    return {start, end, classes, rotatable}
}

export {create}
export type {Line}