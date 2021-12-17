const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000);  // 서버에다 변수?속성을 심는 느낌. 어디에서든 쓸수있는 전역변수같은

app.use((req, res, next) => {
    console.log('모든 요청에 실행');
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
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

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
});