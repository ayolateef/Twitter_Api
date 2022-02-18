const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const  Tweet = require('../models/Tweets');
const Comments = require('../models/Comments')
const {validateTweet} = require('../validations/tweet');
 
/**
 * Creat a tweet by a user
 */
exports.createTweet = asyncHandler(async (req, res, next) =>{
     const {error} = validateTweet(req.body);
     if(error){
          return res.status(400).send({success: false, message: error.details[0].message});
     }
     const {userId, tweetsId} = req.body;
// create a tweet
const tweet = await Tweet.create({
     userId, 
     tweetsId,

})

// map comments to a tweet
const  mappedComment = tweet.map((tweet) => ({
     tweetId: tweet._id,
     userId: user._id,
     comment: comment.tweet
}));

const comment = await Comment.insertMany(mappedComment);

     
return res.status(201).json({success: true, data: comment});


});