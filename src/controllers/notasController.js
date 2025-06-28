const { _users } = require('./authController');

exports.adicionarNota = (req, res) => {
    const { nomeAluno, nota } = req.body;
    if (nota < 0 || nota > 10)
        return res.status(400).json({ message: 'Nota deve ser entre 0 e 10' });

    const user = _users.find(u => u.email === req.user.email);
    user.notas.push({ nomeAluno, nota });
    res.status(201).json({ message: 'Nota adicionada com sucesso!' });
};

exports.listarNotas = (req, res) => {
    const user = _users.find(u => u.email === req.user.email);
    res.json(user.notas);
};

exports.mediaAluno = (req, res) => {
    const { nomeAluno } = req.params;
    const user = _users.find(u => u.email === req.user.email);
    const notas = user.notas.filter(n => n.nomeAluno === nomeAluno);
    if (notas.length === 0)
        return res.status(404).json({ message: 'Aluno não encontrado' });

    const media = notas.reduce((acc, n) => acc + n.nota, 0) / notas.length;
    res.json({ nomeAluno, media });
};
