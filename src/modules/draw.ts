import * as d3 from "d3";

import {Graph} from "d3-example-grid";
import {add, angle, distance, fromPolar, LabeledPoint, subtract, Vector2} from "./point.ts";
import {Line} from "./line.ts";

/**
 * Draw labeled points on a graph.
 *
 * @param graph The diagram to draw on
 * @param points An array of points to draw
 */
function drawPoints(graph: Graph, points: LabeledPoint[]) {
    d3.select(graph.svg)
        .selectAll('circle.point')
        .data(points)
        .join(enter => enter.append('circle').attr("class", "point"))
        .attr('cx', d => graph.toPixelCoords(d).x)
        .attr('cy', d => graph.toPixelCoords(d).y)
        .attr('r', 0.1 * graph.plot.resolution)
        .attr('fill', '#000000');

    d3.select(graph.svg)
        .selectAll('text.label')
        .data(points)
        .join(
            enter => enter.append("text").attr("class", "label")
        )
        .attr("x", d => graph.toPixelCoords(d).x)
        .attr("y", d => graph.toPixelCoords(d).y)
        .attr("dx", d => d.offsetX)
        .attr("dy", d => d.offsetY)
        .text(d => d.text)
}


/**
 * Draw lines on a diagram.
 *
 * If the line is rotatable, attach a rotationHandler to it.
 *
 * @param context    The diagram to draw on
 * @param lines      An array of lines to dray
 * @param callbacks  Callbacks to attach the rotation handler
 */
function drawLines(graph: Graph, lines: Line[], callbacks: Array<() => void>) {

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
        .attr("x1", d => graph.toPixelCoords(d.start).x)
        .attr("y1", d => graph.toPixelCoords(d.start).y)
        .attr("x2", d => graph.toPixelCoords(d.end).x)
        .attr("y2", d => graph.toPixelCoords(d.end).y);
}

/**
 * Create a drag behaviour for an elem
 *
 * @param context The graph
 * @param callbacks An array of functions to call when the element is dragged
 */


/**
 * Create a rotation handler for an SVGLineElement to handle when it is dragged
 *
 * @param context   The Graph the line belongs to
 * @param callbacks An array of callbacks to invoke when the line is dragged / rotated
 */
let rotationHandler = (context: Graph, callbacks: Array<() => void>) => {
    /**
     * Rotate this line element when it is dragged with the mouse
     *
     * @param event The mouse event
     * @param d     The line data
     */
    function dragged(this: SVGLineElement, event: MouseEvent, d: Line) {
        // Convert the grid location to plot coordinates
        let gripLocation: Vector2 = context.fromPixelCoords({x: event.x, y: event.y})
        // Calculate the grip location relative to the start of the line
        let relativeGripLocation: Vector2 = subtract(gripLocation, d.start)

        // Calculate the angle and relative location of the new end point
        let newAngle = angle(relativeGripLocation)
        let length = distance(d.start, d.end)
        let relativeEnd = fromPolar(length, newAngle)

        // Transform from relative back to absolute plot coordinates and update the original datum
        // Note, we cannot replace d.end with the updatedEndPoint because d3 is using the original reference
        let updatedEndPoint = add(d.start, relativeEnd)
        d.end.x = updatedEndPoint.x
        d.end.y = updatedEndPoint.y

        // Convert back to pixel coords
        let p2 = context.toPixelCoords(updatedEndPoint)

        // Change the end location of the SVGLineElement
        d3.select(this)
            .attr("x2", p2.x)
            .attr("y2", p2.y);

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

export {drawPoints, drawLines}