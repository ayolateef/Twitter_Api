const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth");

const {
  createTweet,
  getTweets,
  postTweet,
  createComment,
  updateTweet,
} = require("../controllers/tweet");

router.post("/", protect, createTweet);
router.get("/", protect, getTweets);
router.get("/:id", protect, postTweet);
router.post("/:id/comment", protect, createComment);
router.put("/:id", protect, updateTweet);

module.exports = router;
