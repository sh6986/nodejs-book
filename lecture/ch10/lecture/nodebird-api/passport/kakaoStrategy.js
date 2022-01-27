const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const User = require('../models/user');

module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',    // 카카오에 미리 등록해놓은 리다이렉트 주소와 동일
    }, async (accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile);
        try {
            // 사용자 존재하는지 확인
            const exUser = await User.findOne({
               where: {snsId: profile.id, provider: 'kakao'},
            });
            if (exUser) {   // 사용자 존재O
                done(null, exUser);
            } else {    // 사용자 존재X. 해당프로젝트에 가입시킴
                const newUser = await User.create({
                    email: profile._json && profile._json.kakao_account.email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao',
                });
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }))
};