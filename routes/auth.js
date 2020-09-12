const express = require("express");
const multer = require("multer");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("./loginCheck");
const flash = require("connect-flash");
const path = require("path");

const { User, Video } = require("../models");

require("dotenv").config();

const router = express.Router();

/*Register post*/

const upload = multer({
  //diskStorage,limits 속성
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "profileImg/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(
        null,
        path.basename(file.originalname, ext) + new Date().valueOf() + ext
      );
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/img", isNotLoggedIn, upload.single("img"), (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
});
const upload2 = multer();

router.post("/register", upload2.none(), async (req, res, next) => {
  try {
    const exUser = await User.findOne({ where: { email: req.body.email } });
    if (exUser) {
      req.flash("registerError", "이미 가입된 이메일 입니다.");
      return res.redirect("/");
    } else {
      const hash = await bcrypt.hash(req.body.password, 10);
      await User.create({
        email: req.body.email,
        nick: req.body.name,
        password: hash,
        profile_image: req.body.ProfileUrl,
      });
      res.redirect("/");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});
/*login post*/
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      console.error(error);
      return next(error);
    }

    if (!user) {
      req.flash("loginError", info.message);
      return res.redirect("/");
    }

    req.login(user, loginError => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      console.log(user.nick + " 님이 로그인 하셨습니다."); /* 접속자 이름 */
      return res.redirect("/");
    });
  })(req, res, next);
});

router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

router.post("/logout", isLoggedIn, async (req, res, next) => {
  try {
    req.logout();
    res.clearCookie(process.env.SECRET_COOKIE);
    req.session.destroy(() => {
      req.session;
    });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
