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

// describe('POST /login', () => {
//     const agent = request.agent(app);
//     beforeEach((done) => {
//         agent
//             .post('/auth/login')
//             .send({
//                 email: 'okok960411@gmail.com',
//                 password: '1111'
//             })
//             .end(done);
//     });
//
//     test('이미 로그인했으면 redirect /', (done) => {
//         const message = encodeURIComponent('로그인한 상태입니다.');
//         agent
//             .post('/auth/join')
//             .send({
//                 email: 'okok960411@gmail.com',
//                 nick: 'osh',
//                 password: '1111',
//             })
//             .expect('Location', `/?error=${message}`)
//             .expect(302, done);
//     });
// });
//
// describe('POST /login', () => {
//     test('가입되지 않은 회원', async (done) => {
//         const message = encodeURIComponent('가입되지 않은 회원입니다.');
//         request(app)
//             .post('/auth/login')
//             .send({
//                 email: 'okok960411@gmail.com',
//                 password: '1111',
//             })
//             .expect('Location', `/?loginError=${message}`)
//             .expect(302, done);
//     });
//
//     test('로그인 수행', async (done) => {
//         request(app)
//             .post('/auth/login')
//             .send({
//                 email: 'okok960411@gmail.com',
//                 password: '1111',
//             })
//             .expect('Location', '/')
//             .expect(302, done);
//     });
//
//     test('비밀번호 틀림', async (done) => {
//         const message = encodeURIComponent('비밀번호가 일치하지 않습니다.');
//         request(app)
//             .post('/auth/login')
//             .send({
//                 email: 'okok960411@gmail.com',
//                 password: '1111',
//             })
//             .expect('Location', `/?loginError=${message}`)
//             .expect(302, done);
//     });
// });

// describe('GET /logout', (done) => {
//     test('로그인 되어있지 않으면 403', async () => {
//         request(app)
//             .get('/auth/logout')
//             .expect(403, done);
//     });
//
//     const agent = request.agent(app);   // 여러테스트에 걸쳐 그 상태 유지
//     beforeEach((done) => {  // 테스트하기 직전에 실행
//         agent
//             .post('/auth/login')
//             .send({
//                 email: 'okok960411@gmail.com',
//                 password: '1111'
//             })
//             .end(done);
//     });
//
//     test('로그아웃 수행', async (done) => {
//         const message = encodeURIComponent('비밀번호가 일치하지 않습니다.');
//         agent
//             .get('/auth/logout')
//             .expect('Location', `/`)
//             .expect(302, done)
//     });
// });

afterAll(async () => {
    await sequelize.sync({ force: true });  // db 초기화함(가입햇던 내역을 다시 지우기 위해. 안지우면 다시실행시 중복에러)
});