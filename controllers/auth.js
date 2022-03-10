const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/Users");
const { validateLogin } = require("../validations/auth");
const sendTokenResponse = require("../middleware/tokenresponse");
const { stat } = require("fs");

/**
 * Login User
 */
exports.login = asyncHandler(async (req, res, next) => {
  // Validate login
  const { error } = validateLogin(req.body);
  if (error) return next(new ErrorResponse(error.details[0].message, 400));

  //check for user
  const user = await User.findOne({ email: req.body.email }).select("password");
  if (!user) return next(ErrorResponse(error.details[0].message, 400));

  //check if the user password is correct
  const isMatch = await user.matchPassword(req.body.password);
  if (!isMatch)
    return next(new ErrorResponse("Invalid username or password", 400));

  //delete password from user response
  delete user.password;

  // Generate a token for the user
  sendTokenResponse(user, 200, res);

  res.status(200).json({ success: true });
});

/**
 * Forgot User Password
 */
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse("There is no email with that email", 404));
  }
  //Get reset Token
  const resetToken = user.getResetPasswordToken();

  console.log(resetToken);
  res.status(200).json({ success: true, data: user });
});

/**
 * Knowing logged in user
 */
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ success: true, data: user });
});
