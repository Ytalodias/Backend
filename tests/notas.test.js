const request = require('supertest');
const app = require('../src/app');
const { _users } = require('../src/controllers/authController');

describe('Notas', () => {
  let token;

  beforeEach(async () => {
    _users.length = 0;
    await request(app).post('/register').send({ email: 'a@a.com', senha: '123' });
    const res = await request(app).post('/login').send({ email: 'a@a.com', senha: '123' });
    token = res.body.token;
  });

  test('Sem token não acessa notas', async () => {
    const res = await request(app).get('/notas');
    expect(res.statusCode).toBe(401);
  });

  test('Adiciona nota válida', async () => {
    const res = await request(app).post('/notas')
      .set('Authorization', token)
      .send({ nomeAluno: 'João', nota: 8 });
    expect(res.statusCode).toBe(201);
  });

  test('Nota fora do intervalo é rejeitada', async () => {
    const res = await request(app).post('/notas')
      .set('Authorization', token)
      .send({ nomeAluno: 'João', nota: 15 });
    expect(res.statusCode).toBe(400);
  });

  test('Lista notas do usuário', async () => {
    await request(app).post('/notas')
      .set('Authorization', token)
      .send({ nomeAluno: 'João', nota: 7 });

    const res = await request(app).get('/notas').set('Authorization', token);
    expect(res.body.length).toBe(1);
  });

  test('Média correta', async () => {
    await request(app).post('/notas').set('Authorization', token).send({ nomeAluno: 'Ana', nota: 10 });
    await request(app).post('/notas').set('Authorization', token).send({ nomeAluno: 'Ana', nota: 8 });

    const res = await request(app).get('/notas/Ana/media').set('Authorization', token);
    expect(res.body.media).toBe(9);
  });

  test('Aluno não encontrado', async () => {
    const res = await request(app).get('/notas/Inexistente/media').set('Authorization', token);
    expect(res.statusCode).toBe(404);
  });
});
