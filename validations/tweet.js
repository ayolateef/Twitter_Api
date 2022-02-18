const Joi = require('joi');

exports.validateTweet = (tweet)=> {
     const schema = Joi.object({ 
          tweet: Joi.string().required(),
          userId: Joi.string().required(),
          comments: Joi.array().comments(Joi.object({})).required()


     });
     return schema.validate(tweet);
}