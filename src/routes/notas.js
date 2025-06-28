const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const controller = require('../controllers/notasController');

router.post('/', auth, controller.adicionarNota);
router.get('/', auth, controller.listarNotas);
router.get('/:nomeAluno/media', auth, controller.mediaAluno);

module.exports = router;
