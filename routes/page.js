const express = require("express");
const fs = require("fs");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("./loginCheck");

const { User, Video, Comment, sequelize } = require("../models");
const video_board = require("../models/video_board");

router.get("/", async (req, res, next) => {
  await Video.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "nick"],
      },
    ],
    order: [["createdAt", "ASC"]],
  })
    .then(value => {
      res.render("main", {
        title: "Project2",
        user: req.user,
        datas: value,
      });
      console.log(value);
    })
    .catch(error => {
      console.error(error);
      next(error);
    });
});
router.get("/map", isLoggedIn, (req, res, next) => {
  try {
    res.render("kakaoMapApi", {
      title: "kakao map api",
      user: req.user,
      jskey: process.env.jsKey,
    });
    console.log(process.env.jskey);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/register", isNotLoggedIn, (req, res, next) => {
  try {
    res.render("register", {
      title: "register-page",
      user: req.user,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.get("/login", isNotLoggedIn, (req, res, next) => {
  try {
    res.render("login", {
      title: "login-page",
      user: req.user,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/upload", isLoggedIn, (req, res, next) => {
  try {
    res.render("uploadPage", {
      title: "업로드",
      user: req.user,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/MyPage/:id", isLoggedIn, async (req, res, next) => {
  await Video.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "nick"],
      },
    ],
    order: [["createdAt", "ASC"]],
    where: { userId: req.params.id },
  })
    .then(value => {
      res.render("myPage", {
        title: "너튜브",
        user: req.user,
        lists: value,
      });
      console.log(value);
    })
    .catch(error => {
      console.error(error);
      next(error);
    });
});

router.get("/detail/:postId", async (req, res, next) => {
  await Video.findOne({
    include: [
      {
        model: User,
        attributes: ["id", "nick"],
      },
      {
        model: Comment,
      },
    ],
    order: [[{ model: Comment }, "group_Id", "ASC"]],
    where: { id: req.params.postId },
  })
    .then(value => {
      res.render("videoDetail", {
        title: "너튜브",
        user: req.user,
        result: value,
      });

      // console.log(value.comments);
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});

router.get("/edit/:postId", isLoggedIn, async (req, res, next) => {
  await Video.findOne({
    include: [
      {
        model: User,
        attributes: ["id", "nick"],
      },
    ],
    where: { id: req.params.postId },
  })
    .then(value => {
      res.render("videoEdit", {
        title: "너튜브",
        user: req.user,
        result: value,
      });
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});
module.exports = router;
