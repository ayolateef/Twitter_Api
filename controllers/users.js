const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/Users");
const { validateUser } = require("../validations/user");

/**
 * Get all users
 */
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  return res.status(200).json({ success: true, data: users });
});

/**
 * Get a single user
 */
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate("tweets");
  if (!user) {
    return next(
      new ErrorResponse(`User with id of ${req.params.id} not found`, 404)
    );
  }
  return res.status(200).json({ success: true, data: user });
});

/**
 * Create a User
 */
exports.createUser = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { error } = validateUser(req.body);
  if (error)
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });
  const { first_name, last_name, email, password } = req.body;


  const user = await User.create({
     first_name,
    last_name,
    email,
    password
  });
  console.log('user created', user)
  return res.status(201).json({ success: true, data: user});
});
