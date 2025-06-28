require('dotenv').config();      // Carrega variáveis do .env
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user');

jest.setTimeout(30000);          // Timeout maior para testes

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterEach(async () => {
    await User.deleteMany();     // Limpa usuários após cada teste para evitar interferência
});

afterAll(async () => {
    await mongoose.connection.close();  // Fecha conexão após todos os testes
});

describe('Testes de Autenticação', () => {
    it('deve cadastrar um usuário', async () => {
        const res = await request(app)
            .post('/register')
            .send({ email: 'teste@teste.com', password: '123456' });
        expect(res.status).toBe(201);
    });

    it('não deve permitir email duplicado', async () => {
        await request(app).post('/register').send({ email: 'teste@teste.com', password: '123456' });
        const res = await request(app).post('/register').send({ email: 'teste@teste.com', password: '123456' });
        expect(res.status).toBe(400);
    });
});
