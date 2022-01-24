const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

// dotenv 파일은 최대한 위에 적어야 한다.
// dotenv 하는순간 process.env 설정값(ex. process.env.COOKIE_SECRET)들이 들어가는데 config() 아래코드부터 적용된다.
// dotenv 파일은 유출되지 않게 조심해야 함
dotenv.config();
const pageRouter = require('./routes/page');

const app = express();
app.set('port', process.env.PORT || 8001);  // 개발시에는 8001 사용하고 배포시에는 다른 포트를 사용하므로 || 로 엮어줌
                                            // 따로 process.env.PORT 값을 설정하지 않으면 8001
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false
    },
}));

app.use(`/`, pageRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {  // next 안쓰더라도 무조건 있어야함. 생략하면 안됨
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};    // 개발모드시에는 에러상세내역 보여주고 배포모드일시 안보이게
    res.status(err.status || 500).render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});