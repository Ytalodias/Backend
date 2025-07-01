const { Duplex } = require('stream');

class MeuDuplex extends Duplex {
    constructor() {
        super();
        this._dados = [];
    }

    _write(chunk, encoding, callback) {
        console.log(`Escrevendo: ${chunk.toString()}`);
        this._dados.push(chunk);
        callback();
    }

    _read(size) {
        if (this._dados.length > 0) {
            const dado = this._dados.shift();
            console.log(`Lendo: ${dado.toString()}`);
            this.push(dado);
        } else {
            this.push(null); // Finaliza a leitura
        }
    }
}

const duplex = new MeuDuplex();

duplex.write('Primeiro dado.\n');
duplex.write('Segundo dado.\n');
duplex.end();

duplex.on('data', (chunk) => {
    // Apenas para disparar o _read
});
