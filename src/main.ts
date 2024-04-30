import './style.css'

import {createGraph} from "d3-example-grid";

import {AngleAnnotation} from "./main/AngleAnnotation.ts";
import {LabeledPoint} from "./main/LabeledPoint.ts";
import {RotatableLine} from "./main/RotatableLine.ts"

import {drawAngles, drawLines, drawPoints} from "./main/draw.ts";

import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';


hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('css', css);
hljs.highlightAll();

{   // intro example
    let diagram = createGraph(640, 400)
    let b = new LabeledPoint(5, 4, "b")
    let c = new LabeledPoint(4, 7.5, "c")
    let bc = new RotatableLine(b, c, [], true)

    let bx = {location: b.location.add({x: 1, y: 0})}
    let cbx = new AngleAnnotation(b, bx, c)

    const drawPointsFn = () => drawPoints(diagram, [b, c])
    const drawAnglesFn = () => drawAngles(diagram, [cbx])

    drawLines(diagram, [bc], [drawPointsFn, drawAnglesFn])
    drawPointsFn()
    drawAnglesFn()

    let example = document.querySelector<HTMLDivElement>('#example')!
    example.append(diagram.svg)
}


{   // plot example
    let diagram = createGraph(640, 400)
    let b = new LabeledPoint(5, 4, "b")
    let c = new LabeledPoint(4, 7.5, "c")
    drawPoints(diagram, [b, c])
    let example = document.querySelector<HTMLDivElement>('#example_02')!
    example.append(diagram.svg)
}


{   // rotation example
    let diagram = createGraph(640, 400)

    let b = new LabeledPoint(5, 4, "b")
    let c = new LabeledPoint(4, 7.5, "c")

    let bc = new RotatableLine(b, c, [], true)
    drawLines(diagram, [bc], [])
    // We call drawPoints after drawLines because it looks crisper
    drawPoints(diagram, [b, c])

    let example = document.querySelector<HTMLDivElement>('#example_03')!
    example.append(diagram.svg)
}


{   // fixed example
    let diagram = createGraph(640, 400)

    let b = new LabeledPoint(5, 4, "b")
    let c = new LabeledPoint(4, 7.5, "c")

    let bc = new RotatableLine(b, c, [], true)

    const drawPointsFn = () => drawPoints(diagram, [b, c])

    drawLines(diagram, [bc], [drawPointsFn])
    drawPointsFn()

    let example = document.querySelector<HTMLDivElement>('#example_04')!
    example.append(diagram.svg)
}


{   // annotated example
    let diagram = createGraph(640, 400)

    let b = new LabeledPoint(5, 4, "b")
    let c = new LabeledPoint(4, 7.5, "c")

    let bx = {
        location: b.location.add({x: 1, y: 0})
    }

    let cbx = new AngleAnnotation(b, bx, c)
    let bc = new RotatableLine(b, c, [], true)

    const drawPointsFn = () => drawPoints(diagram, [b, c])
    const drawAnglesFn = () => drawAngles(diagram, [cbx])

    drawLines(diagram, [bc], [drawPointsFn, drawAnglesFn])
    drawPointsFn()
    drawAnglesFn()

    let example = document.querySelector<HTMLDivElement>('#example_05')!
    example.append(diagram.svg)
}

