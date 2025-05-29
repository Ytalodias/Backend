
    class Playlist {
      constructor(musicas = []) {
        this.musicas = musicas;
      }

      adicionarMusica(nome) {
        this.musicas.push(nome);
      }

      [Symbol.iterator]() {
        let index = 0;
        const musicas = this.musicas;

        return {
          next() {
            if (index < musicas.length) {
              return { value: musicas[index++], done: false };
            } else {
              return { done: true };
            }
          }
        };
      }
    }

    const minhaPlaylist = new Playlist(['Imagine', 'Bohemian Rhapsody', 'Hotel California']);
    minhaPlaylist.adicionarMusica('Stairway to Heaven');

    for (const musica of minhaPlaylist) {
      console.log(musica);
    }
  
