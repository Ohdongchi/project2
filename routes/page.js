const express = require("express");
const fs = require("fs");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("./loginCheck");

const { User, Video } = require("../models");

router.get("/", async (req, res, next) => {
  Video.findAll({
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
        data: value,
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
module.exports = router;
