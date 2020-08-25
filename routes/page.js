const express = require("express");
const fs = require("fs");
const router = express.Router();

const { User, Video } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    res.render("layout", {
      title: "Project2",
      user: req.user,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.get("/map", (req, res, next) => {
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

router.get("/register", (req, res, next) => {
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
router.get("/login", (req, res, next) => {
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
module.exports = router;