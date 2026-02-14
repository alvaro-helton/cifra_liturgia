
let tom; // Será inicializado quando o DOM estiver pronto

// Inicializar quando o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    tom = document.getElementById("tom").innerHTML;
    console.log("Tom carregado:", tom);
    
    // Converter notas para cifras no tom original
    processarTransposicao(tom, false);
});

// Mapa de ajustes para diferenças negativas
const ajustesDiferenca = {
    '-3.5': 2.5,
    '-3': 3,
    '-2.5': 3.5,
    '-2': 4
};

// Função para ajustar diferença
function ajustarDiferenca(diferenca) {
    const chave = diferenca.toString();
    return ajustesDiferenca[chave] !== undefined ? ajustesDiferenca[chave] : diferenca;
}

// Mapa de notas e valores base
const notasMap = {
    'la': 0,
    'las': 0.5,
    'si': 1,
    'do': 1.5,
    'dos': 2,
    're': 2.5,
    'res': 3,
    'mi': 3.5,
    'fa': 4,
    'fas': 4.5,
    'sol': 5,
    'sols': 5.5
};

// Mapa de valores para nomes de notas
const notasNomes = {
    0: 'A', 0.5: 'A#', 1: 'B', 1.5: 'C', 2: 'C#', 2.5: 'D', 3: 'D#', 3.5: 'E',
    4: 'F', 4.5: 'F#', 5: 'G', 5.5: 'G#',
    6: 'A', 6.5: 'A#', 7: 'B', 7.5: 'C', 8: 'C#', 8.5: 'D', 9: 'D#', 9.5: 'E',
    10: 'F', 10.5: 'F#', 11: 'G', 11.5: 'G#'
};

// Função para encontrar a nota mais próxima considerando ciclo de 12 semitons
function encontrarNotaProxima(valor) {
    // Normalizar o valor para estar entre 0 e 12
    let valorNormalizado = valor % 12;
    if (valorNormalizado < 0) valorNormalizado += 12;
    
    // Procurar no mapa de notas
    for (let i = 0; i <= 12; i += 0.5) {
        if (Math.abs(i - valorNormalizado) < 0.01) {
            return notasNomes[i];
        }
    }
    
    // Se não encontrar exatamente, procurar no mapa com valores maiores
    if (notasNomes[valor]) return notasNomes[valor];
    
    // Fallback: procurar a mais próxima
    let maiorValor = Math.floor(valor * 2) / 2;
    if (notasNomes[maiorValor]) return notasNomes[maiorValor];
    
    return null;
}

// Função principal para processar transposição
function processarTransposicao(novoTomSelecionado, usarValorAlternativo = false) {
    const valores = usarValorAlternativo ? 
        { la: 6, las: 6.5, si: 7, do: 1.5, dos: 2, re: 2.5, res: 3, mi: 3.5, fa: 4, fas: 4.5, sol: 5, sols: 5.5 } :
        { la: 0, las: 0.5, si: 1, do: 1.5, dos: 2, re: 2.5, res: 3, mi: 3.5, fa: 4, fas: 4.5, sol: 5, sols: 5.5 };
    
    let diferenca = parseFloat(novoTomSelecionado) - parseFloat(tom);
    diferenca = ajustarDiferenca(diferenca);
    
    // Atualizar valores de todas as notas
    Object.keys(notasMap).forEach(classe => {
        const elementos = document.querySelectorAll('.' + classe);
        elementos.forEach(elemento => {
            const novoValor = valores[classe] + diferenca;
            const nota = encontrarNotaProxima(novoValor);
            
            if (nota) {
                elemento.innerHTML = nota;
                elemento.title = 'Tom: ' + novoValor; // Mostrar o valor ao passar mouse
            } else {
                elemento.innerHTML = novoValor.toFixed(1);
            }
        });
    });
    
    return { novoTom: novoTomSelecionado, diferenca: diferenca };
}

function novotom(){
    let novoTomSelecionado = document.getElementById("selecionatom").value;
    document.getElementById("novotom").innerHTML = novoTomSelecionado;
    
    const resultado = processarTransposicao(novoTomSelecionado, false);
}

// Executa a função ao carregar a página
//window.addEventListener('DOMContentLoaded', novotom);

function transposicao(){
    let novoTomSelecionado = document.getElementById("selecionatom").value;
    document.getElementById("novotom").innerHTML = novoTomSelecionado;
    
    const resultado = processarTransposicao(novoTomSelecionado, true);
    
    console.log("Tom original: ", tom, "Novo tom: ", novoTomSelecionado, "Diferença: ", resultado.diferenca);
}
