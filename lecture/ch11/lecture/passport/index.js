const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);    // 세션에 user의 id만 저장.
                // 메모리의 호율성을 위해 id만 저장해놓았다가 필요할 때에 deserializeUserdptj db로 가져온다.
    });

    // { id: 3, 'connect.sid': s%920r24084903 }

    passport.deserializeUser((id, done) => { // passport session이 sid에 해당하는 id가 3이라는것을 알아내고 인수로 넘겨줌
        User.findOne({
            where: {id},
            include: [{
                model: User,
                attributes: ['id', 'nick'],
                as: 'Followers',
            }, {
                model: User,
                attributes: ['id', 'nick'],
                as: 'Followings',
            }],
        })
            .then(user => done(null, user)) // req.user, req.isAuthenticated() : 로그인한 사용자면 true
            .catch(err => done(err))
    });

    local();
    kakao();
}