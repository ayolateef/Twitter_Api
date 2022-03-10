const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Tweet = require("../models/Tweets");
const Comment = require("../models/Comments");
const User = require("../models/Users");
const { validateTweet } = require("../validations/tweet");
const { validateComment } = require("../validations/comment");

/**
 * Creat a tweet by a user
 */
exports.createTweet = asyncHandler(async (req, res, next) => {
  const { error } = validateTweet(req.body);
  if (error) {
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });
  }
  const { userId, tweet } = req.body;
  // create a tweet
  const createdTweets = await Tweet.create({
    userId,
    tweet,
  });
  return res.status(201).json({ success: true, data: createdTweets });
});

/**
 * Get all tweets
 */
exports.getTweets = asyncHandler(async (req, res, next) => {
  const tweets = await Tweet.find();

  return res.status(201).json({ success: true, data: tweets });
});

/**
 *create a comment under a tweet
 */

exports.createComment = asyncHandler(async (req, res, next) => {
  const { error } = validateComment(req.body);
  if (error)
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });

  // create comment
  const { userId, text, tweetId } = req.body;
  if (!tweetId) {
    return next(
      new ErrorResponse(`TweetId not found with id of ${req.params.id}`, 404)
    );
  }
  //find the tweet to comment on
  const postedTweet = await Tweet.findOne({ _id: req.params.tweetId });

  const comment = await Comment.create({
    userId,
    text,
    tweetId: postedTweet._id,
  });
  // then push the comment to the tweet
  return res.status(401).send({ success: true, data: comment });
});

/**
 * Get a tweet with all its comments
 */
exports.postTweet = asyncHandler(async (req, res, next) => {
  const tweet = await Tweet.findById(req.params.id);

  //  const user = await User.findById(req.params.id);

  const comments = await Comment.find({
    tweetId: tweet._id,
  }).deepPopulate("user._id");

  // find a user comments in a tweet
  // commment.find(tweetId and userId and text)

  if (!tweet) {
    return next(
      new ErrorResponse(`Tweet not found with id of ${req.params.id}`, 404)
    );
  }
  return res.status(200).json({ success: true, data: { tweet, comments } });
});

/**
 * Update a tweet
 *  PUT - /tweets/:id
 */
exports.updateTweet = asyncHandler(async (req, res, next) => {
  const tweet = await Tweet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!tweet) {
    return next(
      new ErrorResponse(`Tweet not found with ${req.params.id}`, 404)
    );
  }
  return res.status(200).json({ success: true, data: tweet });
});
