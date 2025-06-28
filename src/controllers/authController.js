const jwt = require('jsonwebtoken');
const SECRET = 'secreto123';
const users = [];

exports.register = (req, res) => {
    const { email, senha } = req.body;
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'Email já cadastrado' });
    }
    users.push({ email, senha, notas: [] });
    res.status(201).json({ message: 'Usuário cadastrado' });
};

exports.login = (req, res) => {
    const { email, senha } = req.body;
    const user = users.find(u => u.email === email && u.senha === senha);
    if (!user) {
        return res.status(400).json({ message: 'Credenciais inválidas' });
    }
    const token = jwt.sign({ email }, SECRET);
    res.json({ token });
};

exports._users = users; // exporta para testes e notas usarem
