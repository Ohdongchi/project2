const express = require('express');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./logincheck');
const flash = require('connect-flash');

require('dotenv').config();

const router = express.Router();

/*Register post*/
router.post('/register', isNotLoggedIn, async(req, res, next) => {
    try {
        const exUser = await User.findOne({ where: { email: req.body.email } });
        if (exUser) {
            req.flash('registerError', '이미 가입된 이메일 입니다.');
            return res.redirect('/');
        } else {
            const hash = await bcrypt.hash(req.body.password, 10);
            await User.create({
                email: req.body.email,
                nick: req.body.name,
                password: hash,
            })
            res.redirect('/');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});
/*login post*/
var n = 0;
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
        if (error) {
            console.error(error);
            return next(error);
        }

        if (!user) {
            req.flash('loginError', info.message);
            return res.redirect('/');
        }

        req.login(user, (loginError) => {
            console.log(n++);
            if (loginError) {
                console.error(loginError);
                return next(loginError)
            }
            console.log(user.nick + ' 님이 로그인 하셨습니다.'); /* 접속자 이름 */
            return res.redirect('/');
        });
    })(req, res, next);
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
}), (req, res) => {
    res.redirect('/');
});

router.post('/logout', isLoggedIn, async(req, res, next) => {
    function requestApi() {
        // router.get('/oauth/logout?client_id=?&logout_redirect_uri=?&state=?', () => {

        // });
        console.log('hi!');
    }
    try {
        req.logout();
        res.clearCookie(process.env.SECRET_COOKIE);
        req.session.destroy(() => {
            req.session;
        });
        // Kakao.Auth.logout();
        // // console.log(req.Kakao.Auth.getAccessToken());
        // req.Kakao.Auth.loginForm();
        requestApi();
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
});


module.exports = router;