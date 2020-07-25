const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = (passport) => {
    // local
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async(email, password, done) => {
        try {
            const exUser = await User.findOne({ where: { email } });
            if (exUser) {
                console.log(password, exUser.password);
                const result = await bcrypt.compare(password, exUser.password);
                console.log(result);
                if (result) { // result == 비밀번호
                    done(null, exUser); // 회원가입이 되있다면 로그인 완료
                } else {
                    // 회원가입은 되있지만 비밀번호가 맞지 않는 경우
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.' })
                }
            } else { //가입된 회원이 존재하지 않는 경우
                done(null, false, { message: '가입되지 않은 회원입니다' })
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};