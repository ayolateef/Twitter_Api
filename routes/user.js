const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth");

const {
  createUser,
  followUser,
  unfollowUser,
  getUsers,
  getUser,
} = require("../controllers/users");

router.post("/", createUser);
router.put("/:id/follow", protect, followUser);
router.put("/:id/unfollow", protect, unfollowUser);
router.get("/", getUsers);
router.get("/:id", protect, getUser);

module.exports = router;
