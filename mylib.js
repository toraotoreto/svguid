// mylib.js
const lib = {
  getSVG: (key) => {
    // Exemplo simples: gera um SVG com um círculo, usando a chave para variar a cor ou algo único
    // Substitua isso pela lógica real do seu projeto (ex.: geração de GUIDs ou SVGs complexos)
    const color = key.length > 5 ? 'blue' : 'red';  // Exemplo: cor baseada no tamanho da chave
    return `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40" fill="${color}" />
            </svg>`;
  }
};

export default lib;