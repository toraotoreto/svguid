import { getColorIterator } from "./utils/colors/color.js"
import sample from "./examples/widget00.js"

function widget(key, draw) {
    
    let nextColor = getColorIterator(key)

    // Corpo do robô
    draw.rect(195, 315)
        .move(392.5, 365)
        .fill(nextColor())
        .radius(30);

    // Cabeça do robô
    draw.rect(270, 225)
        .move(357, 205.5)
        .fill(nextColor())
        .radius(22.5);

    // Olhos
    draw.circle(37.5)
        .move(430, 260)
        .fill('#000');
    draw.circle(37.5)
        .move(510, 260)
        .fill('#000');

    // Boca
    draw.rect(97.5, 18)
        .move(445, 330)
        .fill('#000')
        .radius(7.5);

    // Braço esquerdo (3 bolas em sequência)
    draw.circle(67.5)
        .move(330, 440)
        .fill(nextColor());
    draw.circle(52.5)
        .move(330, 510)
        .fill(nextColor());
    draw.circle(37.5)
        .move(330, 565)
        .fill(nextColor());

    // Braço direito (3 bolas em sequência)
    draw.circle(67.5)
        .move(580, 440)
        .fill(nextColor());
    draw.circle(52.5)
        .move(595, 510)
        .fill(nextColor());
    draw.circle(37.5)
        .move(607, 565)
        .fill(nextColor());

    // Pernas
    draw.rect(60, 180)
        .move(415, 680)
        .fill(nextColor())
        .radius(7.5);
    draw.rect(60, 180)
        .move(510, 680)
        .fill(nextColor())
        .radius(7.5);
    
    // Descomente linha abaixo para ver exemplo 0
    //sample(key,draw)
}

export default widget