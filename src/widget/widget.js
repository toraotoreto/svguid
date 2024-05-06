import { getColorIterator } from "./utils/colors/color.js"
import sample from "./examples/widget00.js"

function widget(key, draw) {
    
    let nextColor = getColorIterator(key)

    draw.rect().size(500,500).move(250,250).fill(nextColor())
    draw.circle().size(350).move(400,325).fill(nextColor()).opacity(0.5)
    draw.circle().size(350).move(250,325).fill(nextColor()).opacity(0.5)
    
    // Descomente linha abaixo para ver exemplo 0
    //sample(key,draw)
}

export default widget