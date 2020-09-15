const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { isLoggedIn, isNotLoggedIn } = require("./loginCheck");

const { User, Video, Hashtag, Comment } = require("../models");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    res.render("upload", {
      title: "업로드",
      user: req.user,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

fs.readdir("uploads", error => {
  if (error) {
    console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
    fs.mkdirSync("upload");
  }
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
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
router.post("/video", isLoggedIn, upload.single("videoFile"), (req, res) => {
  console.log(req.file);
  res.json({ url: `/video/${req.file.filename}` });
});

const upload2 = multer();

router.post("/write", isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    const videoUpload = await Video.create({
      title: req.body.Title,
      text: req.body.Text,
      video_URL: req.body.url,
      userId: req.user.id,
    });
    const hashtag = req.body.Text.match(/#[^\s#]*/g);
    if (hashtag) {
      const result = await Promise.all(
        hashtag.map(tag =>
          Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() },
          })
        )
      );
      await videoUpload.addHashtags(result.map(r => r[0]));
    }
    return res.redirect("/");
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.post("/comment/:videoId", isLoggedIn, async (req, res, next) => {
  try {
    await Comment.create({
      text: req.body.comment,
      author: req.user.id,
      videoBoardId: req.params.videoId,
    });

    res.redirect("/detail/" + req.params.videoId);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/comment/reply/:videoId", isLoggedIn, async (req, res, next) => {
  try {
    console.log(req.body);
    await Comment.create({
      text: req.body.replyComment,
      author: req.user.id,
      videoBoardId: req.params.videoId,
      parent: req.body.commentId,
      dept: req.body.dept,
    });

    res.redirect("/detail/" + req.params.videoId);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
// router.post("/hashtag", async (req, res, next) => {
//   const query = req.query.hashtag;
//   if (query) {
//     return res.redirect("/");
//   }
//   try {
//     const hashtag = await Hashtag.findOne({ where: { title: query } });
//     let posts = [];
//     if (hashtag) {
//       pasts = await hashtag.getPosts({ include: [{ model: User }] });
//     }
//     return res.render("main", {
//       title: `${query} | project2`,
//       user: req.user,
//       twits: posts,
//     });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });
module.exports = router;
