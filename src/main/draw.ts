import * as d3 from "d3";

import {Graph, Point2} from "d3-example-grid";

import {RotatableLine} from "./RotatableLine.ts";
import {Vector2} from "geometry-lib";
import {AngleAnnotation} from "./AngleAnnotation.ts";
import {LabeledPoint, PointRef} from "./LabeledPoint.ts";

// Convenience function
function pixelCoords(graph: Graph, point: PointRef): Point2 {
    return graph.toPixelCoords(point.location)
}

/**
 * Draw labeled points on a graph.
 *
 * @param graph  The graph to draw to
 * @param points An array of points to draw
 */
function drawPoints(graph: Graph, points: LabeledPoint[]) {
    d3.select(graph.svg)
        .selectAll('circle.point')
        .data(points)
        .join(enter => enter.append('circle').attr("class", "point"))
        .attr('cx', d => pixelCoords(graph, d).x)
        .attr('cy', d => pixelCoords(graph, d).y)
        .attr('r', 0.1 * graph.plot.resolution)
        .attr('fill', '#000000');

    d3.select(graph.svg)
        .selectAll('text.label')
        .data(points)
        .join(
            enter => enter.append("text").attr("class", "label")
        )
        .attr("x", d => pixelCoords(graph, d).x)
        .attr("y", d => pixelCoords(graph, d).y)
        .attr("dx", d => d.offsetX)
        .attr("dy", d => d.offsetY)
        .text(d => d.text)
}


/**
 * Draw lines on a diagram.
 *
 * If the line is rotatable, attach a rotationHandler to it.
 *
 * @param graph      The graph to draw to
 * @param lines      An array of lines to dray
 * @param callbacks  Callbacks to attach the rotation handler
 */
function drawLines(graph: Graph, lines: RotatableLine[], callbacks: Array<() => void>) {

    d3.select(graph.svg)
        .selectAll("line.line")
        .data(lines)
        .join(enter => enter.append("line").attr("class", "line"))
        .each((d, _, el) => {
            if (d.rotatable) {
                d3.selectAll(el)
                    .classed("rotatable", true)
                    .call(rotationHandler(graph, callbacks))
            }
        })
        .attr("class", function (d, _, e) {
            let existingClasses = d3.selectAll(e).attr("class").split(" ")
            existingClasses.push(...d.classes)
            return existingClasses.join(" ");
        })
        .attr("x1", d => pixelCoords(graph, d.start).x)
        .attr("y1", d => pixelCoords(graph, d.start).y)
        .attr("x2", d => pixelCoords(graph, d.end).x)
        .attr("y2", d => pixelCoords(graph, d.end).y);
}


/**
 * Draw the angle and angle symbol between two lines.
 *
 * @param graph       The graph to draw to
 * @param annotations The angle annotation data
 */
function drawAngles(graph: Graph, annotations: AngleAnnotation[]) {
    // Draw the angel arch
    d3.select(graph.svg)
        .selectAll("path.angle-arc")
        .data(annotations)
        .join(enter => enter.append("path").attr("class", "angle-arc"))
        .attr("transform", d => {
            let p = pixelCoords(graph, d.origin)
            return `translate(${p.x},${p.y})`
        })
        .attr("d", d => {
            let radius = 1.5
            return d3.arc()({
                innerRadius: radius * graph.plot.resolution,
                outerRadius: radius * graph.plot.resolution + 1,
                // We want an angle of 0  to be inline with the x-axis, and the angle to be expressed anticlockwise
                startAngle: d.angleStart() + Math.PI / 2,
                endAngle: -d.angle() + Math.PI / 2
            })
        })

    // Also draw the labels
    d3.select(graph.svg)
        .selectAll('text.angle')
        .data(annotations)
        .join(enter => enter.append("text").attr("class", "angle"))
        .attr("x", d => {
            let radius = 0.85 * graph.plot.resolution
            let midAngle = -(d.angle() - d.angleStart()) / 2
            return radius * Math.cos(midAngle) + pixelCoords(graph, d.origin).x
        })
        .attr("y", d => {
            let radius = 0.85 * graph.plot.resolution
            let midAngle = -(d.angle() - d.angleStart()) / 2
            return radius * Math.sin(midAngle) + pixelCoords(graph, d.origin).y
        })
        .text(d => d.label().text)
}

/**
 * Create a rotation handler for an SVGLineElement to handle when it is dragged
 *
 * @param graph     The Graph the element belongs to
 * @param callbacks An array of callbacks to invoke when the line is dragged / rotated
 */
let rotationHandler = (graph: Graph, callbacks: Array<() => void>) => {
    /**
     * Rotate this line element when it is dragged with the mouse
     *
     * @param event The mouse event
     * @param d     The line data
     */
    function dragged(this: SVGLineElement, event: MouseEvent, d: RotatableLine) {
        // Convert the grid location to plot coordinates
        let gripLocation = Vector2.from(graph.fromPixelCoords({x: event.x, y: event.y}))

        // Calculate the grip location relative to the start of the line
        let relativeGripLocation = gripLocation.subtract(d.start.location)

        // Calculate the angle and relative location of the new end point
        let newAngle = relativeGripLocation.angle()

        let length = Vector2.from(d.start.location).distanceTo(d.end.location)
        let relativeEnd = Vector2.fromPolar(length, newAngle)

        // Transform from relative back to absolute plot coordinates and update the original datum
        d.end.location = d.start.location.add(relativeEnd)

        // Convert back to pixel coords
        let p = pixelCoords(graph, d.end)

        // Change the end location of the SVGLineElement
        d3.select(this)
            .attr("x2", p.x)
            .attr("y2", p.y);

        // Propagate changes to callbacks
        callbacks.forEach(c => c())
    }

    function dragStarted(this: Element) {
        d3.select(this).style("cursor", "grabbing");
    }

    function dragEnded(this: Element) {
        d3.select(this).style("cursor", null);
    }

    return <any>d3.drag()
        .on("start", dragStarted)
        .on("drag", <any>dragged)
        .on("end", dragEnded)
}

export {drawPoints, drawLines, drawAngles}
