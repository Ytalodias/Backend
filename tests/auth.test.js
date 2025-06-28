const request = require('supertest');
const app = require('../src/app');
const { _users } = require('../src/controllers/authController');

describe('Autenticação', () => {
  beforeEach(() => _users.length = 0);

  test('Cadastra usuário novo', async () => {
    const res = await request(app).post('/register').send({ email: 'a@a.com', senha: '123' });
    expect(res.statusCode).toBe(201);
  });

  test('Não permite email duplicado', async () => {
    await request(app).post('/register').send({ email: 'a@a.com', senha: '123' });
    const res = await request(app).post('/register').send({ email: 'a@a.com', senha: '123' });
    expect(res.statusCode).toBe(400);
  });

  test('Login correto', async () => {
    await request(app).post('/register').send({ email: 'a@a.com', senha: '123' });
    const res = await request(app).post('/login').send({ email: 'a@a.com', senha: '123' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('Login com senha errada', async () => {
    await request(app).post('/register').send({ email: 'a@a.com', senha: '123' });
    const res = await request(app).post('/login').send({ email: 'a@a.com', senha: 'errado' });
    expect(res.statusCode).toBe(400);
  });
});
