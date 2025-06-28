const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (await User.findOne({ email })) return res.status(400).json({ message: 'Email já cadastrado' });
        const user = await User.create({ email, password });
        res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch {
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) return res.status(400).json({ message: 'Credenciais inválidas' });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch {
        res.status(500).json({ message: 'Erro no servidor' });
    }
};
