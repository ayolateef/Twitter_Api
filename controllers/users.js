const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/Users");
const Tweet = require("../models/Tweets");
const Comment = require("../models/Comments");
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
  const user = await User.findById(req.params.id);

  const comment = await Comment.find({ userId: user._id });

  if (!user) {
    return next(
      new ErrorResponse(`User with id of ${req.params.id} not found`, 404)
    );
  }
  return res.status(200).json({ success: true, data: { user, comment } });
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
    password,
  });
  console.log("user created", user);
  return res.status(201).json({ success: true, data: user });
});

/**
 * a user should follow another user
 */
exports.followUser = asyncHandler(async (req, res, next) => {
  // make sure the user exists
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User with id of ${req.params.id} not found`, 404)
    );
  }

  const { id } = req.body;
  const isIdExist = user.followers.includes(id);

  if (isIdExist) {
    return next(
      new ErrorResponse(
        `User with id of ${req.params.id} already been followed`,
        404
      )
    );
  }

  let followedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $push: { followers: id },
      $inc: { followersCount: 1 },
    },
    { new: true }
  );

  let followingUser = await User.findByIdAndUpdate(
    id,
    {
      $push: { following: req.params.id },
      $inc: { followingCount: 1 },
    },
    { new: true }
  );

  return res
    .status(200)
    .json({ success: true, data: { followedUser, followingUser } });
});

/**
 * a user should unfollow another user
 */
exports.unfollowUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User with id of ${req.params.id} not found`, 404)
    );
  }

  const { id } = req.body;
  const isIdExist = user.followers.includes(id);

  if (!isIdExist) {
    return next(
      new ErrorResponse(
        `User with id of ${req.params.id} already been unfollowed`,
        404
      )
    );
  }

  let unfollowedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { followers: id },
      $inc: { followersCount: -1 },
    },
    { new: true }
  );
  let unfollowingUser = await User.findByIdAndUpdate(
    id,
    {
      $pull: { following: req.params.id },
      $inc: { followingCount: -1 },
    },
    { new: true }
  );

  return res
    .status(200)
    .json({ success: true, data: { unfollowedUser, unfollowingUser } });
});
