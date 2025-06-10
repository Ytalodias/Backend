const express = require('express');
const app = express();
const usersRoutes = require('./users');

app.use(express.json()); 
app.use('/users', usersRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
