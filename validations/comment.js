const Joi = require('joi');

exports.validateComment = (comment)=> {
     const schema = Joi.object({ 
          tweetId: Joi.string().required(),
          userId: Joi.string().required(),
          text: Joi.string().required(),

     });
     return schema.validate(comment);
}