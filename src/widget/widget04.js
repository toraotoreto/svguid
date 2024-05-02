import color from "./utils/colors/color.js"

function widget(key, draw) {
    for (let lin = 0; lin < 10; lin++) {
        for (let col = 0; col < 10; col++) {
            let c = key.next16()
            let fill = color(c, 5)
            let shape = key.next16() % 4 
            if(shape == 0) {
                draw.rect(100, 100).attr({ x: 100 * col, y: lin*100, fill })
            } 
            if(shape == 1) {
                draw.circle(100).attr({ cx: 50 + 100 * col, cy: 50 + lin*100, fill })
            }
            if(shape == 2) { 
                let top = 100 * lin
                let left = 100 * col
                draw.polyline([left, top, left+100, top, left+50, top+100]).attr({ fill })
            }
            if(shape == 3) {
                draw.rect(50, 50).attr({ x: 100 * col, y: lin*100, fill })
            } 
        }
    }
}

export default widget