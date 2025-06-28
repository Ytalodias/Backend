const express = require('express'); // Importa o Express
const app = express(); // Cria um app Express
const livrosRoutes = require('./routes/livrosRoutes'); // Importa nossas rotas

app.use(express.json()); // Permite entender JSON enviado no corpo das requisições
app.use('/api', livrosRoutes); // Usa as rotas com prefixo /api

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
