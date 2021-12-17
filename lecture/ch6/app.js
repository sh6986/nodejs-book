const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000);  // 서버에다 변수?속성을 심는 느낌. 어디에서든 쓸수있는 전역변수같은

// app.use('/about', (req, res, next) => {
// app.use((req, res, next) => {
//     console.log('모든 요청에 실행');
//     next();
// });

app.use((req, res, next) => {
    console.log('1모든 요청에 실행');
    next();
}, (req, res, next) => {
    console.log('2모든 요청에 실행');
    next();
}, (req, res, next) => {
    console.log('3모든 요청에 실행');
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
    // res.send('안녕하세요');
    // res.json({ hello: 'zorocho' });
    // 한 라우터에서 여러번 응답하면 에러.

    // res.writeHead(200, {'Content-Type': 'text/plain'});
    // res.end('안녕하세요');
    // http(require('http')에서 사용하는 이 두줄을 express에서는 아래 한줄로 줄인것임
    res.send('안녕하세요.');
    // 헤더를 만들려면 res.setHeader('Content-Type', 'text/html'); 사용. 물론 res.send 위에 위치해야 함
});

app.post('/', (req, res) => {
    res.send('hello express');
});

app.get('/category/:name', (req, res) => {
    res.send(`hello ${req.params.name}`);
});

app.get('/about', (req, res) => {
    res.send('hello express');
});

app.use((req, res, next) => {
    res.status(404).send('404지롱');
    // 기본적으로 정상이면 status 200이고 보통 생략한다. 404면은 별도로 status404를 보내준다.
})

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('에러났다.');
});

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
});