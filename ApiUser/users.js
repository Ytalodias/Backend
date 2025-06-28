const express = require('express');
const router = express.Router();


let users = [
  { id: 1, name: 'Ana Clara', email: 'ana@example.com' },
  { id: 2, name: 'Luana Florencio', email: 'luana@example.com' },
];


router.get('/', (req, res) => {
  const { name } = req.query;
  if (name) {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
    return res.json(filtered);
  }
  res.json(users);
});


router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado.' });
  }
  res.json(user);
});


router.post('/', (req, res) => {
  const { id, name, email } = req.body;


  if (id === undefined || isNaN(id)) {
    return res.status(400).json({ error: 'ID é obrigatório e deve ser numérico.' });
  }
  if (!name || name.length < 3) {
    return res.status(400).json({ error: 'Nome é obrigatório e deve ter no mínimo 3 letras.' });
  }
  if (!email || !validateEmail(email)) {
    return res.status(400).json({ error: 'Email é obrigatório e deve ser válido.' });
  }


  if (users.some(u => u.id === id)) {
    return res.status(400).json({ error: 'ID já existe.' });
  }

  const newUser = { id, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});


function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

module.exports = router;
