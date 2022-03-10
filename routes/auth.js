const express = require("express");
const { login, getMe, forgotPassword } = require("../controllers/auth");

const router = express.Router();
const { protect } = require("../middleware/auth");

router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/forgotPassword", forgotPassword);

module.exports = router;
