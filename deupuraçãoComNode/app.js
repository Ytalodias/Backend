const fs = require('fs');

// Função para carregar usuários do arquivo JSON
function carregarUsuarios() {
  fs.readFile('usuarios.json', 'utf8', (err, dados) => {
    if (err) {
      // BUG IDENTIFICADO: erro ao ler arquivo — mostrado com console.log
      console.log('Erro ao ler o arquivo:', err.message);
    } else {
      try {
        // FERRAMENTA USADA: try/catch + console.log para verificar se o JSON está correto
        const usuarios = JSON.parse(dados);
        filtrarUsuarios(usuarios);
      } catch (erroParse) {
        // BUG: JSON malformado — causava erro em JSON.parse
        console.log('Erro ao converter JSON:', erroParse.message);
        console.log('Conteúdo lido para debug:', dados);
      }
    }
  });
}

// Função para filtrar usuários com idade > 18
function filtrarUsuarios(lista) {
  const resultado = lista.filter((usuario) => usuario.idade > 18);
  console.log('Usuários maiores de idade:');
  resultado.forEach((u) => {
    console.log(`- ${u.nome} (${u.idade} anos)`);
  });
}

// BUG IDENTIFICADO: variável 'mensagem' não existia
// SOLUÇÃO: declarada a variável antes de usá-la
function exibirMensagem() {
  const mensagem = 'Processamento concluído!';
  console.log(mensagem);
}

function main() {
  carregarUsuarios();
  exibirMensagem();
}

main();
