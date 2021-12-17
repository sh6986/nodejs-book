const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();

app.set('port', process.env.PORT || 3000);  // 서버에다 변수?속성을 심는 느낌. 어디에서든 쓸수있는 전역변수같은

// app.use('/about', (req, res, next) => {
// app.use((req, res, next) => {
//     console.log('모든 요청에 실행');
//     next();
// });

// app.use((req, res, next) => {
//     console.log('1모든 요청에 실행');
//     next();
// }, (req, res, next) => {
//     try {
//         // console.log(에러야);
//     } catch (err) {
//         next(err);  // next() 에 인수가 없으면 다음 미들웨어로 넘어가지만 인수가 있으면 에러처리 미들웨어로 넘어간다.
//     }
// });


app.use(morgan('dev'));

// app.use('요청경로', express.static('실제경로'));
// ex) 요청경로 localhost:3000/zerocho.html     실제경로 learn-express/public/zerocho.html
// ex) 요청경로 localhost:3000/hello.css        실제경로 learn-express/public/hello.css
app.use('/', express.static(path.join(__dirname, 'public')));
// **** 미들웨어들의 순서 중요 **** //
// 거의 모든 미들웨어들은 내부적으로 next를 실행한다고 보면 된다.
// 에를 들어 localhost:3000/about 을 요청했을 경우, 일단 express.static에서 정적파일을 찾고 없을경우
// 라우터로 넘어가서 /about 주소를 매핑한다.
// 혹은 정적파일을 요청한건데 그앞에 다른 cookieParser등의 필요없는 미들웨어가 앞에 있을경우 비효율적이므로 이곳에 위치하는게 적합

app.use(cookieParser());
// app.use(cookieParser('zerochopassword'));  // 암호화된 쿠키

// 예전에는 body-parser를 require해서 사용했지만 지금은 body-parser가 express안에 들어가서
// require하지 않고 아래처럼 사용하면 된다.
// 이 두 코드를 넣어두면 알아서 데이터가 파싱되어서 req.body.name 이런식으로 사용
app.use(express.json());        // 클라이언트가 json으로 보냈을 때 json을 파싱해서 body로 넣어줌
app.use(express.urlencoded({ extended: true }));    // 클라이언트에서 form 보낼때 파싱해서 body로 넣어줌
        // extended true면 qs 모듈을 사용하고 false면 querystring모듈을 사용하는데 qs 모듈이 훨씬 강력하므로 왠만하면 true


/**
 * 라우터
 */
app.get('/', (req, res) => {
    req.cookies     // { mycookie: 'test' }     // 쿠키 가져오기
    // req.signedCookies;  // 암호화된 쿠키 가져올때
    res.cookie('name', encodeURIComponent(name), {      // 쿠키 담기
        expires: new Date(),
        httpOnly: true,
        path: '/',
    });
    res.clearCookie('name', encodeURIComponent(name), {      // 쿠키 지우기
        httpOnly: true,
        path: '/',
    });

    // req.body.name // body 데이터 가져올때

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