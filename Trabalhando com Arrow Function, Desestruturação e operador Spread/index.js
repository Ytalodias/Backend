// ===== 1. Arrow Function contarPares =====
const contarPares = (n) => {
    for (let i = 0; i <= n; i++) {
        if (i % 2 === 0) {
            console.log(i);
        }
    }
};


console.log("=== Números pares de 0 até 10 ===");
contarPares(10);



// ===== 2. Desestruturação do Objeto livro =====
const livro = {
    titulo: "JavaScript Essencial",
    autor: "Alana Souza",
    ano: 2024,
    sinopse: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    editora: "Mundo Dev"
};

const { titulo, ano } = livro;

console.log("=== Informações do livro ===");
console.log("Título:", titulo);
console.log("Ano:", ano);



// ===== 3. Uso de Spread para Criar todasAsFrutas =====
const frutas = ["maçã", "banana"];
const novasFrutas = ["laranja", "abacaxi"];

const todasAsFrutas = [...frutas, ...novasFrutas];

console.log("=== Todas as frutas ===");
console.log(todasAsFrutas);



// ===== 4. Arrow Function verificarAcesso =====
const verificarAcesso = (idade, temIngresso) => {
    if (idade >= 18 && temIngresso) {
        console.log("Acesso permitido");
    } else {
        console.log("Acesso negado");
    }
};

// Exemplos:
console.log("=== Verificação de Acesso ===");
verificarAcesso(20, true);  
verificarAcesso(17, true); 
verificarAcesso(20, false); 



// ===== 5. Arrow Function exibirAviso =====
const exibirAviso = (estaChovendo, semGuardaChuva) => {
    if (estaChovendo || semGuardaChuva) {
        console.log("Leve um guarda-chuva!");
    } else {
        console.log("Tudo certo, pode sair tranquilo");
    }
};


console.log("=== Aviso de saída ===");
exibirAviso(true, false);   
exibirAviso(false, true);  
exibirAviso(false, false); 