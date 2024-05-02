import color from "./utils/colors/color.js"
import grid from "./utils/grid/grid.js"

function widget(key, draw) {
    console.log('grid', grid.getGrid(10));
    let p = 0
    for (let lin = 0; lin < 10; lin++) {
        for (let col = 0; col < 10; col++) {
            let c = key.next256()
            let shape = key.next256() % 4 
            if(shape == 0) {
                draw.rect(100, 100).attr({ x: 100 * col, y: lin*100, fill: color(c, 5) })
            } 
            if(shape == 1) {
                draw.circle(100).attr({ cx: 50 + 100 * col, cy: 50 + lin*100, fill: color(c, 5) })
            }
            if(shape == 2) {
                let top = 100 * lin
                let left = 100 * col
                draw.polyline([left, top, left+100, top, left+50, top+100]).attr({ fill: color(c, 5) })
            }
            if(shape == 3) {
                draw.rect(50, 50).attr({ x: 100 * col, y: lin*100, fill: color(c, 5) })
            } 
        }
    }
    //draw.rect().attr({ x: 0, y: 0, width: 50, height: 50, fill: 'blue' })

}

export default widget