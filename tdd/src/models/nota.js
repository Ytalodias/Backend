const mongoose = require('mongoose');

const NotaSchema = new mongoose.Schema({
    nomeAluno: { type: String, required: true },
    valor: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Nota', NotaSchema);
