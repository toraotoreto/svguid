import color from "./utils/colors/color.js"
import rects from "./utils/grids/grid02.js"
import shapes from "./utils/shapes/shapes01.js"

function widget(key, draw) {
    console.log('shapes', shapes);
    for (let idx in rects) {
        let rect = rects[idx]
        draw.rect(rect.width, rect.height).attr({ 
            x: rect.x, 
            y: rect.y, 
            fill: color(key.next256(),key.next16()%6) 
        })
    }
}

export default widget