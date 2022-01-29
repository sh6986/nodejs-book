const jwt = require('jsonwebtoken');
const RateLimit = require('express-rate-limit');

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인 필요');
        // next() 가 없으므로 다음으로 안넘어가고 여기서 끝난다.
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect('/?error=${message}');
    }
};

exports.verifyToken = (req, res, next) => {
    try {
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);    // 페이로드(데이터부분)담긴다.
                                // 보통 키같은건 헤더에 authorization에 넣음
        return next();
    } catch (error) {   // process.env.JWT_SECRET이 일치하지 않아서 verify가 안될경우(검증이 안될경우) (해커가 위조했거나..)
        if (error.name === 'TokenExpiredError') {   // 유효기간 초과
            return res.status(419).json({
                code: 419,
                message: '토큰이 만료되었습니다.',
            });
        }
        return res.status(401).json({
            code: 401,
            message: '유효하지 않은 토큰입니다.',
        });
    }
};

exports.apiLimiter = new RateLimit({    // 몇분간 몇번썼는지 체크해주는 미들웨어
    windowMs: 60 * 1000,    // 1분
    max: 1, // 1번
    delayMs: 0,  // 호출간격,
    handler(req, res) {
        res.status(this.statusCode).json({  // 429. 제한을 어겼을 경우
            code: this.statusCode,
            message: '1분에 한 번만 요청할 수 있습니다.'
        });
    }
});

// 더이상 이 api 를 쓰지말라 경고
exports.deprecated = (req, res) => {
    res.status(410).json({
        code: 410,
        message: '새로운 버전이 나왔습니다. 새로운 버전을 사용하세요',
    });
};