const request = require('supertest');
const {sequelize} = require('../models');
const app = require('../app');

// 모든것에 앞서 테이블 먼저 생성
beforeAll(async () => {
    await sequelize.sync(); // 테이블 생성
});

describe('POST /join', () => {
    test('로그인 안 했으면 가입', (done) => {
        request(app)
            .post('/auth/join')
            .send({
                email: 'okok960411@gmail.com',
                nick: 'osh',
                password: '1111'
            })
            .expect('Location', '/')
            .expect(302, done);
    });
});

describe('POST /login', (done) => {
    test('로그인 수행', async () => {
        request(app)
            .post('/auth/login')
            .send({
                email: 'okok960411@gmail.com',
                password: '1111'
            })
            .expect('Location', '/')
            .expect(302, done);
    });
});

// describe('POST /join', () => {
//
// });
//
// describe('GET /logout', () => {
//
// });

afterAll(async () => {
    await sequelize.sync({ force: true });  // db 초기화함(가입햇던 내역을 다시 지우기 위해. 안지우면 다시실행시 중복에러)
});