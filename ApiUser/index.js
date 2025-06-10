const express = require('express');
const app = express();
const usersRoutes = require('./users');

app.use(express.json()); // Permite o uso de JSON
app.use('/users', usersRoutes); // Usa as rotas de usuários

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
