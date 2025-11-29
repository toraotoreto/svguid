/**
 * Função principal do widget que desenha um robô personalizado baseado em uma chave de entrada.
 * A chave determina as variações visuais como cores, formas e posições.
 * @param {Object} key - Objeto gerador de números pseudo-aleatórios para determinar variações
 * @param {Object} draw - Objeto de desenho SVG para renderizar os elementos
 */
import { getColorIterator } from "./utils/colors/color.js"
import sample from "./examples/widget00.js"

function widget(key, draw) {

    // Selecionar tipo de fundo baseado na chave (0: xadrez, 1: círculos concêntricos, 2: ondas)
    let backgroundType = key.next() % 3;

    // Array para armazenar as cores usadas no fundo, evitando que o robô use essas cores
    let backgroundColors = [];

    // Criar iterador de cores específico para o fundo, independente do robô
    let backgroundColorIterator = getColorIterator(key);

    // Desenhar o fundo primeiro baseado no tipo selecionado
    if (backgroundType === 0) {
        // Padrão de xadrez: alterna entre duas cores em quadrados
        let color1 = backgroundColorIterator();
        let color2 = backgroundColorIterator();
        backgroundColors = [color1, color2];

        let squareSize = 100; // Tamanho de cada quadrado do xadrez
        for (let x = 0; x < 1000; x += squareSize) {
            for (let y = 0; y < 1000; y += squareSize) {
                // Calcula se o quadrado deve ser color1 ou color2 baseado na posição
                let color = ((x / squareSize) + (y / squareSize)) % 2 === 0 ? color1 : color2;
                draw.rect(squareSize, squareSize).move(x, y).fill(color);
            }
        }
    } else if (backgroundType === 1) {
        // Formas concêntricas: círculos de diferentes tamanhos e cores
        let centerColor = backgroundColorIterator();
        let middleColor = backgroundColorIterator();
        let outerColor = backgroundColorIterator();
        backgroundColors = [centerColor, middleColor, outerColor];

        // Desenha círculos concêntricos do maior para o menor
        draw.circle(800).move(100, 100).fill(outerColor);  // Círculo externo
        draw.circle(600).move(200, 200).fill(middleColor); // Círculo do meio
        draw.circle(400).move(300, 300).fill(centerColor); // Círculo central
    } else if (backgroundType === 2) {
        // Fundo ondulado: linhas curvas senoidais
        let waveColor1 = backgroundColorIterator();
        let waveColor2 = backgroundColorIterator();
        backgroundColors = [waveColor1, waveColor2];

        // Cria ondas senoidais horizontais
        for (let y = 0; y < 1000; y += 50) {
            let points = [];
            for (let x = 0; x <= 1000; x += 20) {
                // Calcula a altura da onda usando seno
                let wave = Math.sin((x + y) * 0.01) * 30;
                points.push(x, y + wave);
            }
            // Desenha a linha da onda alternando cores
            draw.polyline(points).fill('none').stroke({
                color: y % 100 === 0 ? waveColor1 : waveColor2,
                width: 40,
                opacity: 0.7
            });
        }
    }

    // Criar função para obter cores do robô que evita as cores do fundo
    let nextColor = getColorIterator(key);
    let robotColor = () => {
        let color;
        do {
            color = nextColor(); // Obtém próxima cor disponível
        } while (backgroundColors.includes(color)); // Repete se a cor estiver no fundo
        return color;
    };

    // Desenhar corpo do robô (retângulo arredondado central)
    draw.rect(195, 315)  // Largura e altura do corpo
        .move(392.5, 365) // Posição x,y do corpo
        .fill(nextColor()) // Cor aleatória para o corpo
        .radius(30); // Raio dos cantos arredondados

    // Desenhar cabeça do robô (retângulo arredondado acima do corpo)
    draw.rect(270, 225)  // Largura e altura da cabeça
        .move(357, 205.5) // Posição x,y da cabeça
        .fill(nextColor()) // Cor aleatória para a cabeça
        .radius(22.5); // Raio dos cantos arredondados

    // Selecionar tipos independentes para olhos esquerdo, direito e boca (0-4 para cada olho, 0-4 para boca)
    let leftEyeType = key.next() % 5;  // Tipo do olho esquerdo
    let rightEyeType = key.next() % 5; // Tipo do olho direito
    let mouthType = key.next() % 5;    // Tipo da boca

    // Selecionar tipos para braços e pernas (0-2 para cada)
    let armType = key.next() % 3; // Tipo dos braços
    let legType = key.next() % 3; // Tipo das pernas

    // Selecionar tipo de cabeça (menos frequente, usando soma de 3 valores para reduzir probabilidade)
    let headType = (key.next() + key.next() + key.next()) % 2; // Tipo da cabeça (0 ou 1)

    // Desenhar olho esquerdo baseado no tipo selecionado
    if (leftEyeType === 0) {
        // Olho circular pequeno
        draw.circle(37.5).move(430, 260).fill('#000');
    } else if (leftEyeType === 1) {
        // Olho oval horizontal
        draw.ellipse(45, 30).move(425, 250).fill('#000');
    } else if (leftEyeType === 2) {
        // Olho quadrado arredondado
        draw.rect(40, 40).move(425, 245).fill('#000').radius(5);
    } else if (leftEyeType === 3) {
        // Olho circular grande
        draw.circle(50).move(420, 250).fill('#000');
    } else if (leftEyeType === 4) {
        // Olho oval inclinado para cima
        draw.ellipse(40, 25).move(425, 255).fill('#000').rotate(15);
    }

    // Desenhar olho direito baseado no tipo selecionado
    if (rightEyeType === 0) {
        // Olho circular pequeno
        draw.circle(37.5).move(510, 260).fill('#000');
    } else if (rightEyeType === 1) {
        // Olho oval horizontal
        draw.ellipse(45, 30).move(505, 250).fill('#000');
    } else if (rightEyeType === 2) {
        // Olho quadrado arredondado
        draw.rect(40, 40).move(505, 245).fill('#000').radius(5);
    } else if (rightEyeType === 3) {
        // Olho circular grande
        draw.circle(50).move(500, 250).fill('#000');
    } else if (rightEyeType === 4) {
        // Olho oval inclinado para baixo
        draw.ellipse(40, 25).move(505, 255).fill('#000').rotate(-15);
    }

    // Desenhar boca baseado no tipo selecionado (sempre preta)
    if (mouthType === 0) {
        // Boca retangular média
        draw.rect(97.5, 18).move(445, 330).fill('#000').radius(7.5);
    } else if (mouthType === 1) {
        // Boca curva (sorriso)
        draw.polyline([445, 340, 455, 325, 495, 325, 505, 340]).fill('#000');
    } else if (mouthType === 2) {
        // Boca triangular (formato de V)
        draw.polyline([470, 330, 485, 350, 500, 330]).fill('#000');
    } else if (mouthType === 3) {
        // Boca pequena retangular
        draw.rect(60, 12).move(455, 335).fill('#000').radius(6);
    } else if (mouthType === 4) {
        // Boca larga retangular
        draw.rect(120, 20).move(430, 330).fill('#000').radius(10);
    }

    // Desenhar braços baseado no tipo selecionado (cada braço é composto por 3 círculos)
    if (armType === 0) {
        // Braços retos para baixo (posição padrão)
        // Braço esquerdo: 3 círculos empilhados verticalmente
        draw.circle(67.5).move(330, 440).fill(robotColor()); // Parte superior
        draw.circle(52.5).move(330, 510).fill(robotColor()); // Parte média
        draw.circle(37.5).move(330, 565).fill(robotColor()); // Parte inferior

        // Braço direito: 3 círculos empilhados verticalmente
        draw.circle(67.5).move(580, 440).fill(robotColor()); // Parte superior
        draw.circle(52.5).move(595, 510).fill(robotColor()); // Parte média
        draw.circle(37.5).move(607, 565).fill(robotColor()); // Parte inferior
    } else if (armType === 1) {
        // Braços estendidos horizontalmente para os lados
        // Braço esquerdo: 3 círculos alinhados horizontalmente para esquerda
        draw.circle(67.5).move(280, 440).fill(robotColor()); // Parte próxima ao corpo
        draw.circle(52.5).move(220, 440).fill(robotColor()); // Parte média
        draw.circle(37.5).move(160, 440).fill(robotColor()); // Parte distante

        // Braço direito: 3 círculos alinhados horizontalmente para direita
        draw.circle(67.5).move(630, 440).fill(robotColor()); // Parte próxima ao corpo
        draw.circle(52.5).move(690, 440).fill(robotColor()); // Parte média
        draw.circle(37.5).move(750, 440).fill(robotColor()); // Parte distante
    } else if (armType === 2) {
        // Braços levantados em ângulo (diagonal para cima)
        // Braço esquerdo: 3 círculos em diagonal para cima-esquerda
        draw.circle(67.5).move(280, 380).fill(robotColor()); // Parte próxima ao corpo
        draw.circle(52.5).move(240, 320).fill(robotColor()); // Parte média
        draw.circle(37.5).move(200, 260).fill(robotColor()); // Parte distante

        // Braço direito: 3 círculos em diagonal para cima-direita
        draw.circle(67.5).move(630, 380).fill(robotColor()); // Parte próxima ao corpo
        draw.circle(52.5).move(670, 320).fill(robotColor()); // Parte média
        draw.circle(37.5).move(710, 260).fill(robotColor()); // Parte distante
    } else if (armType === 3) {
        // Braços cruzados sobre o peito
        // Braço esquerdo: 3 círculos em diagonal para direita
        draw.circle(67.5).move(420, 420).fill(robotColor()); // Parte próxima ao corpo
        draw.circle(52.5).move(460, 380).fill(robotColor()); // Parte média
        draw.circle(37.5).move(500, 340).fill(robotColor()); // Parte distante

        // Braço direito: 3 círculos em diagonal para esquerda
        draw.circle(67.5).move(480, 420).fill(robotColor()); // Parte próxima ao corpo
        draw.circle(52.5).move(440, 380).fill(robotColor()); // Parte média
        draw.circle(37.5).move(400, 340).fill(robotColor()); // Parte distante
    }

    // Desenhar pernas baseado no tipo selecionado (retângulos arredondados)
    if (legType === 0) {
        // Pernas retas (posição padrão, lado a lado)
        draw.rect(60, 180).move(415, 680).fill(robotColor()).radius(7.5); // Perna esquerda
        draw.rect(60, 180).move(510, 680).fill(robotColor()).radius(7.5); // Perna direita
    } else if (legType === 1) {
        // Pernas abertas (mais afastadas uma da outra)
        draw.rect(60, 180).move(380, 680).fill(robotColor()).radius(7.5); // Perna esquerda mais à esquerda
        draw.rect(60, 180).move(545, 680).fill(robotColor()).radius(7.5); // Perna direita mais à direita
    } else if (legType === 2) {
        // Pernas cruzadas (uma inclinada para direita, outra para esquerda)
        draw.rect(60, 180).move(400, 680).fill(robotColor()).radius(7.5).rotate(10);  // Perna esquerda inclinada para direita
        draw.rect(60, 180).move(525, 680).fill(robotColor()).radius(7.5).rotate(-10); // Perna direita inclinada para esquerda
    }

    // Descomente linha abaixo para ver exemplo 0
    //sample(key,draw)
}

export default widget