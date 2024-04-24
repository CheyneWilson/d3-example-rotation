import './style.css'

import {createGraph} from "d3-example-grid";
import {LabeledPoint} from "./modules/point.ts";
import * as pt from "./modules/point.ts";
import * as ln from "./modules/line.ts";
import {drawLines, drawPoints} from "./modules/draw.ts";
import {Line} from "./modules/line.ts";

import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('css', css);
hljs.highlightAll();

{
    let diagram = createGraph(640, 400)
    let b: LabeledPoint = pt.create(2.5, 3.5, "b")
    let c: LabeledPoint = pt.create(9.5, 4.5, "c")
    let bc: Line = ln.create(b, c, ["rotatable"], true)

    const drawPointsFn = () => drawPoints(diagram, [b,c ])
    drawLines(diagram, [bc], [drawPointsFn])
    drawPointsFn()

    let example = document.querySelector<HTMLDivElement>('#example')!
    example.append(diagram.svg)
}


{
    let diagram = createGraph(640, 400)

    let b: LabeledPoint = pt.create(2.5, 3.5, "b")
    let c: LabeledPoint = pt.create(9.5, 4.5, "c")

    drawPoints(diagram, [b, c])

    let example = document.querySelector<HTMLDivElement>('#example_02')!
    example.append(diagram.svg)
}



{
    let diagram = createGraph(640, 400)

    let b: LabeledPoint = pt.create(2.5, 3.5, "b")
    let c: LabeledPoint = pt.create(9.5, 4.5, "c")

    let bc: Line = ln.create(b, c, ["rotatable"], true)
    drawLines(diagram, [bc], [])
    // We call drawPoints after drawLines so that
    drawPoints(diagram, [b, c])

    let example = document.querySelector<HTMLDivElement>('#example_03')!
    example.append(diagram.svg)
}




{
    let diagram = createGraph(640, 400)

    let b: LabeledPoint = pt.create(2.5, 3.5, "b")
    let c: LabeledPoint = pt.create(9.5, 4.5, "c")

    let bc: Line = ln.create(b, c, ["rotatable"], true)

    const drawPointsFn = () => drawPoints(diagram, [b,c ])
    drawLines(diagram, [bc], [drawPointsFn])
    drawPointsFn()

    let example = document.querySelector<HTMLDivElement>('#example_04')!
    example.append(diagram.svg)
}

