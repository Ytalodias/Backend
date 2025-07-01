const fs = require('fs');

const arquivos = ['entrada1.txt', 'entrada2.txt'];

arquivos.forEach((arquivo) => {
    const streamLeitura = fs.createReadStream(arquivo, { encoding: 'utf8' });

    console.log(`--- Iniciando leitura de ${arquivo} ---`);

    streamLeitura.on('data', (chunk) => {
        console.log(`Chunk lido de ${arquivo}:`, chunk);
    });

    streamLeitura.on('end', () => {
        console.log(`Leitura de ${arquivo} concluída.\n`);
    });

    streamLeitura.on('error', (err) => {
        console.error(`Erro ao ler ${arquivo}:`, err.message);
    });
});
