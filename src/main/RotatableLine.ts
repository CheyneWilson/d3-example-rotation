import {PointRef} from "./LabeledPoint.ts";

class RotatableLine {
    start: PointRef
    end: PointRef
    classes: string[]
    rotatable: boolean

    /**
     * Create a new line between two points
     *
     * @param start     The origin of the line
     * @param end       The destination of the line
     * @param classes   CSS classes to style the line with
     * @param rotatable When true, allow the line to be rotated around the start point
     */
    constructor(start: PointRef, end: PointRef, classes: string[] = [], rotatable: boolean = false) {
        this.start = start
        this.end = end
        this.classes = classes
        this.rotatable = rotatable
    }
}


export {RotatableLine}
