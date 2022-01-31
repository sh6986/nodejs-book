const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { email, nick, password } = req.body;

    try {
        // 이미 사용자가 존재하는지 확인
        const exUser = await User.findOne({
            where: {
                email
            }
        });

        if (exUser) {
            return res.redirect('/join?error=exist');
        }

        const hash = await bcrypt.hash(password, 12);   // 두번째파라미터 (12) 숫자가 클수록 복잡

        await User.create({
            email,
            nick,
            password: hash,
        });

        return res.redirect('/');

    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {     // 미들웨어 확장시켰음
    // console.log(req.user); 로그인하기 전이므로 값이 없다.
    passport.authenticate('local',  // localStrategy를 찾는다.
        (authError, user, info) => {    // localStrategy 로직 실행 후 done() 인수 받아옴
        // 서버에러
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        // 로그인 실패시
        if (!user) {
            return res.redirect(`/?loginError=${info.message}`);
        }
        // 로그인 성공시
        return req.login(user,   // index.js 의 serializeUser로 간다.
            (loginError) => {
            // 에러시
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            // 세션쿠키를 브라우저로 보내준다.
            return res.redirect('/');   // 로그인성공
        });
    })(req, res, next);     // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

router.get('/logout', isLoggedIn, (req, res) => {
    console.log(req.user);  // 사용자정보
    req.logout();   // 서버에서 세션쿠키를 지운다.
    req.session.destroy();
    res.redirect('/');
});

// 카카오 로그인하기 누를시
router.get('/kakao', passport.authenticate('kakao'));
        // 카카오 로그인 페이지에서 로그인한다.
        // 로그인성공시에 미리 카카오에 등록해놓은 리다이렉트주소(auth/kakao/callback)로 리다이렉트시키면서
        // 데이터가 들어있는 코드를 함께 보낸다.

// 리다이렉트 받은 주소(카카오 로그인페이지에서 로그인버튼을 누르면 요청받는 주소)
router.get('/kakao/callback', passport.authenticate('kakao', {  // kakaoStrategy로 간다.
    failureRedirect: '/',   // 카카오 로그인 실패시
}), (req, res) => {     // 카카오 로그인 성공시
    res.redirect('/');
});

module.exports = router;