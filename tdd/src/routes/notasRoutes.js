const express = require('express');
const router = express.Router();
const notasController = require('../controllers/notasController');
const auth = require('../middlewares/authMiddleware');

router.post('/notas', auth, notasController.adicionarNota);
router.get('/notas', auth, notasController.listarNotas);
router.get('/notas/:nomeAluno/media', auth, notasController.mediaAluno);

module.exports = router;
