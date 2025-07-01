const fs = require('fs');
const { Transform } = require('stream');

const arquivos = ['entrada1.txt', 'entrada2.txt'];
const arquivosSaida = ['saida_maiusculo1.txt', 'saida_maiusculo2.txt'];

class MaiusculoTransform extends Transform {
    constructor() {
        super();
    }

    _transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
}

arquivos.forEach((arquivo, index) => {
    const leitura = fs.createReadStream(arquivo, { encoding: 'utf8' });
    const escrita = fs.createWriteStream(arquivosSaida[index], { encoding: 'utf8' });
    const transformacao = new MaiusculoTransform();

    leitura.pipe(transformacao).pipe(escrita);

    escrita.on('finish', () => {
        console.log(`Transformação e gravação concluídas para ${arquivosSaida[index]}.`);
    });

    escrita.on('error', (err) => {
        console.error(`Erro em ${arquivosSaida[index]}:`, err.message);
    });
});
