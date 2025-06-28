const express = require('express');
const authRoutes = require('./routes/auth');
const notasRoutes = require('./routes/notas');

const app = express();
app.use(express.json());

app.use(authRoutes);
app.use('/notas', notasRoutes);

module.exports = app;
