

// 1. buscarDadosDoServidor
function buscarDadosDoServidor() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ status: 200, dados: "OK" });
      }, 2000);
    });
  }
  
  async function testarBusca() {
    const resposta = await buscarDadosDoServidor();
    console.log("Buscar Dados:", resposta);
  }
  
  // 2. validarIdade
  function validarIdade(idade) {
    return new Promise((resolve, reject) => {
      if (idade >= 18) {
        resolve("Acesso permitido");
      } else {
        reject("Acesso negado");
      }
    });
  }
  
  async function testarIdade() {
    try {
      const res1 = await validarIdade(20);
      console.log("Idade 20:", res1);
    } catch (erro) {
      console.log("Idade 20:", erro);
    }
  
    try {
      const res2 = await validarIdade(16);
      console.log("Idade 16:", res2);
    } catch (erro) {
      console.log("Idade 16:", erro);
    }
  }
  
  // 3. baixarImagem, baixarVideo, baixarMidias
  function baixarImagem() {
    return new Promise(resolve => {
      setTimeout(() => resolve("Imagem baixada"), 2000);
    });
  }
  
  function baixarVideo() {
    return new Promise(resolve => {
      setTimeout(() => resolve("Vídeo baixado"), 3000);
    });
  }
  
  async function baixarMidias() {
    const [img, vid] = await Promise.all([baixarImagem(), baixarVideo()]);
    console.log(img);
    console.log(vid);
  }
  
  // 4. fazerLogin
  function fazerLogin(usuario, senha) {
    return new Promise((resolve, reject) => {
      if (usuario === "admin" && senha === "1234") {
        resolve("Login bem-sucedido");
      } else {
        reject("Credenciais inválidas");
      }
    });
  }
  
  async function testarLogin() {
    try {
      const resultado = await fazerLogin("admin", "1234");
      console.log("Login 1:", resultado);
    } catch (erro) {
      console.log("Login 1:", erro);
    }
  
    try {
      const resultado = await fazerLogin("user", "0000");
      console.log("Login 2:", resultado);
    } catch (erro) {
      console.log("Login 2:", erro);
    }
  }
  
  // 5. getUsuario, getPedidos, mostrarPedidos
  function getUsuario() {
    return new Promise(resolve => {
      setTimeout(() => resolve({ id: 5, nome: "João" }), 1000);
    });
  }
  
  function getPedidos(idUsuario) {
    return new Promise(resolve => {
      setTimeout(() => resolve([
        { id: 1, item: "Livro" },
        { id: 2, item: "Caderno" }
      ]), 1500);
    });
  }
  
  async function mostrarPedidos() {
    const usuario = await getUsuario();
    const pedidos = await getPedidos(usuario.id);
  
    console.log(`Usuário: ${usuario.nome}`);
    console.log("Pedidos:", pedidos);
  }
  
  // 6. contarAte com delay
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function contarAte(numero) {
    for (let i = 1; i <= numero; i++) {
      console.log(i);
      await delay(1000);
    }
  }
  
  // 7. buscarComTimeout
  function buscarComTimeout() {
    const busca = new Promise(resolve => {
      setTimeout(() => resolve("Dados carregados"), 2000);
    });
  
    const timeout = new Promise((_, reject) => {
      setTimeout(() => reject("Tempo esgotado"), 1000);
    });
  
    return Promise.race([busca, timeout]);
  }
  
  async function testarBuscaComTimeout() {
    try {
      const resultado = await buscarComTimeout();
      console.log("Busca com timeout:", resultado);
    } catch (erro) {
      console.log("Busca com timeout:", erro);
    }
  }
  
  // 8. verificarResultados com allSettled
  function promessa1() {
    return new Promise(resolve => setTimeout(() => resolve("Resolveu em 1s"), 1000));
  }
  
  function promessa2() {
    return new Promise((_, reject) => setTimeout(() => reject("Rejeitou em 2s"), 2000));
  }
  
  function promessa3() {
    return new Promise(resolve => setTimeout(() => resolve("Resolveu em 0.5s"), 500));
  }
  
  async function verificarResultados() {
    const resultados = await Promise.allSettled([
      promessa1(),
      promessa2(),
      promessa3()
    ]);
  
    resultados.forEach((res, i) => {
      console.log(`Promessa ${i + 1}:`, res.status, res.value || res.reason);
    });
  }
  
  // Executar todos os testes
  async function executarTudo() {
    console.log("---- Iniciando testes ----\n");
    await testarBusca();
    console.log("\n--- Teste de idade ---");
    await testarIdade();
    console.log("\n--- Baixando mídias ---");
    await baixarMidias();
    console.log("\n--- Teste de login ---");
    await testarLogin();
    console.log("\n--- Mostrar pedidos ---");
    await mostrarPedidos();
    console.log("\n--- Contando até 5 ---");
    await contarAte(5);
    console.log("\n--- Teste de timeout ---");
    await testarBuscaComTimeout();
    console.log("\n--- Verificando resultados ---");
    await verificarResultados();
    console.log("\n---- Fim dos testes ----");
  }
  
  executarTudo();
