//1

const contarPares = (n) => {
  for (let i = 0; i <= n; i++) {
    if (i % 2 === 0) {
      console.log(i);
    }
  }
};


contarPares(10);

//2

const livro = {
  titulo: "JavaScript Essencial",
  autor: "Alana Souza",
  ano: 2024,
  sinopse: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  editora: "Mundo Dev"
};


const { titulo, ano } = livro;

console.log(titulo);
console.log(ano);   

//3
const frutas = ["maçã", "banana"];
const novasFrutas = ["laranja", "abacaxi"];

const todasAsFrutas = [...frutas, ...novasFrutas];

console.log(todasAsFrutas); 

//4

const verificarAcesso = (idade, temIngresso) => {
  if (idade >= 18 && temIngresso) {
    console.log("Acesso permitido");
  } else {
    console.log("Acesso negado");
  }
};


verificarAcesso(20, true); 
verificarAcesso(17, true);  


//5

const exibirAviso = (estaChovendo, semGuardaChuva) => {
  if (estaChovendo || semGuardaChuva) {
    console.log("Leve um guarda-chuva!");
  } else {
    console.log("Tudo certo, pode sair tranquilo");
  }
};


exibirAviso(true, false);   
exibirAviso(false, false);  
