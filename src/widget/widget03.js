import color from "./utils/colors/color.js"
import rects from "./utils/grids/grid01.js"

function widget(key, draw) {
    for (let idx in rects) {
        let rect = rects[idx]
        let tone = key.next256()%8
        let c = color(key.next256(), tone)
        let shape = key.next256() % 4
        if (shape == 0) {
            draw.rect(rect.width, rect.height).attr({
                x: rect.x,
                y: rect.y,
                fill: c
            })
        }
        if (shape == 1) {
            let r = rect.width
            let cx = rect.x + r / 2
            let cy = rect.y + r / 2
            console.log({ cx, cy, r, c });
            draw.circle(r).attr({ cx, cy, fill: c })
        }
        if (shape == 2) {
            let x1 = rect.x
            let y1 = rect.y
            let x2 = rect.x + rect.width
            let y2 = rect.y
            let x3 = rect.x + rect.width/2
            let y3 = rect.y + rect.height
            console.log({ x1, y1, x2, y2, x3, y3 });
            draw.polyline([x1, y1, x2, y2, x3, y3]).attr({ fill: c })
        }
        if (shape == 3) {
            let x1 = rect.x
            let y1 = rect.y + rect.height
            let x2 = rect.x + rect.width
            let y2 = rect.y + rect.height
            let x3 = rect.x + rect.width/2
            let y3 = rect.y + 0
            console.log({ x1, y1, x2, y2, x3, y3 });
            draw.polyline([x1, y1, x2, y2, x3, y3]).attr({ fill: c })
        }
    }
}

export default widget