import {LabeledPoint, PointRef} from "./LabeledPoint.ts";

/**
 * Used to drawing an annotation of the angle between two lines.
 */
class AngleAnnotation {
    origin: PointRef
    start: PointRef
    end: PointRef

    /**
     * Draw an annotation for an angle
     *
     * @param origin The center point of the annotations
     * @param start  The starting point of the annotation curve
     * @param end  The ending point of the annotation
     */
    constructor(origin: PointRef, start: PointRef, end: PointRef) {
        // We want an angle of 0  to be inline with the x-axis, and the angle to be expressed anticlockwise
        this.origin = origin
        this.start = start
        this.end = end
    }

    public angle(): number {
        let oa = this.start.location.subtract(this.origin.location)
        let oc = this.end.location.subtract(this.origin.location)
        return oa.angleBetween(oc)
    }

    public angleStart(): number {
        let oa = this.start.location.subtract(this.origin.location)
        return oa.angle()
    }

    public label(): LabeledPoint {
        // Degrees are more intuitive to display for many people
        let text = (this.angle() * 180 / Math.PI).toFixed(0) + "°";
        // The label is placed outside the semicircle radius
        let labelRadius = 0.7
        let x = this.origin.location.x + labelRadius * Math.cos(this.angle() / 2)
        let y = this.origin.location.y + labelRadius * Math.sin(this.angle() / 2)
        return new LabeledPoint(x, y, text, "0", "0")
    }
}

export {AngleAnnotation}