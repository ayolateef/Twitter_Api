const express = require("express");
const router = express.Router();

const {
  createTweet,
  getTweets,
  postTweet,
  createComment,
  updateTweet
} = require("../controllers/tweet");

router.post("/", createTweet);
router.get("/", getTweets);
router.get("/:id", postTweet);
router.post("/:id/comment", createComment);
router.put("/:id", updateTweet);

module.exports = router;
