const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.post('/join', async (req, res, next) => {
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

router.post('/login', (req, res, next) => {     // 미들웨어 확장시켰음
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
        return req.login(user   // index.js 의 serializeUser로 간다.
            , (loginError) => {
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
    req.logout();   // 서버에서 세션쿠키를 지운다.
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;