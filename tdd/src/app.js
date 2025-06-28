const express = require('express');
const app = express();
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const notasRoutes = require('./routes/notasRoutes');

app.use(express.json());
app.use(authRoutes);
app.use(notasRoutes);

module.exports = app;
