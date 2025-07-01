const fs = require('fs');

const arquivos = ['saida1.txt', 'saida2.txt'];
const conteudos = [
    'Primeira linha do arquivo 1.\nSegunda linha do arquivo 1.\n',
    'Primeira linha do arquivo 2.\nSegunda linha do arquivo 2.\n'
];

arquivos.forEach((arquivo, index) => {
    const streamEscrita = fs.createWriteStream(arquivo, { encoding: 'utf8' });

    streamEscrita.write(conteudos[index]);
    
    streamEscrita.end();

    streamEscrita.on('finish', () => {
        console.log(`Gravação de ${arquivo} finalizada.`);
    });

    streamEscrita.on('error', (err) => {
        console.error(`Erro ao escrever em ${arquivo}:`, err.message);
    });
});
