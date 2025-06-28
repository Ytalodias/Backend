require('dotenv').config();
jest.setTimeout(30000);

const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user');
const Nota = require('../models/nota');

let token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await User.deleteMany();
  await Nota.deleteMany();

  await request(app).post('/register').send({ email: 'teste@teste.com', password: '123456' });

  const resLogin = await request(app)
    .post('/login')
    .send({ email: 'teste@teste.com', password: '123456' });

  token = resLogin.body.token;
});

afterEach(async () => {
  await Nota.deleteMany();
});

afterAll(async () => {
  await User.deleteMany();
  await Nota.deleteMany();
  await mongoose.connection.close();
});

describe('Testes das rotas de Notas', () => {
  it('Não permite acessar rotas de notas sem token', async () => {
    const res = await request(app).get('/notas');
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/Token/i);
  });

  it('Adiciona uma nova nota com token válido', async () => {
    const res = await request(app)
      .post('/notas')
      .set('Authorization', `Bearer ${token}`)  // Aqui o Bearer
      .send({ nomeAluno: 'João', valor: 8.5 });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Nota adicionada com sucesso!');
  });

  it('Não permite adicionar nota fora do intervalo', async () => {
    const res1 = await request(app)
      .post('/notas')
      .set('Authorization', `Bearer ${token}`)
      .send({ nomeAluno: 'Maria', valor: -1 });
    expect(res1.status).toBe(400);

    const res2 = await request(app)
      .post('/notas')
      .set('Authorization', `Bearer ${token}`)
      .send({ nomeAluno: 'Maria', valor: 11 });
    expect(res2.status).toBe(400);
  });

  it('Lista todas as notas do usuário atual', async () => {
    await request(app)
      .post('/notas')
      .set('Authorization', `Bearer ${token}`)
      .send({ nomeAluno: 'Ana', valor: 7 });
    await request(app)
      .post('/notas')
      .set('Authorization', `Bearer ${token}`)
      .send({ nomeAluno: 'Ana', valor: 9 });

    const res = await request(app)
      .get('/notas')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty('nomeAluno', 'Ana');
  });

  it('Retorna média correta para um aluno', async () => {
    await request(app)
      .post('/notas')
      .set('Authorization', `Bearer ${token}`)
      .send({ nomeAluno: 'Pedro', valor: 6 });
    await request(app)
      .post('/notas')
      .set('Authorization', `Bearer ${token}`)
      .send({ nomeAluno: 'Pedro', valor: 8 });

    const res = await request(app)
      .get('/notas/Pedro/media')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('media');
    expect(res.body.media).toBeCloseTo(7);
  });

  it('Retorna 404 para aluno não encontrado', async () => {
    const res = await request(app)
      .get('/notas/AlunoInexistente/media')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Aluno não encontrado');
  });
});
