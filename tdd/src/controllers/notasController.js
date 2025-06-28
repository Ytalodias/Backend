const Nota = require('../models/nota');

exports.adicionarNota = async (req, res) => {
    const { nomeAluno, valor } = req.body;
    if (valor < 0 || valor > 10) return res.status(400).json({ message: 'Nota deve ser entre 0 e 10' });
    await Nota.create({ nomeAluno, valor, user: req.user._id });
    res.status(201).json({ message: 'Nota adicionada com sucesso!' });
};

exports.listarNotas = async (req, res) => {
    const notas = await Nota.find({ user: req.user._id });
    res.json(notas);
};

exports.mediaAluno = async (req, res) => {
    const { nomeAluno } = req.params;
    const notas = await Nota.find({ user: req.user._id, nomeAluno });
    if (notas.length === 0) return res.status(404).json({ message: 'Aluno não encontrado' });

    const media = notas.reduce((acc, n) => acc + n.valor, 0) / notas.length;
    res.json({ media });
};
