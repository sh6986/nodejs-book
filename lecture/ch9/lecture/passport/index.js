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

    passport.deserializeUser((id, done) => {
        User.findOne({where: {id}})
            .then(user => {
                done(null, user);
            })
            .catch(err => {
                done(err);
            })
    });

    local();
    kakao();
}