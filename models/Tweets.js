 const mongoose = require('mongoose');
 const {Schema} = mongoose;
 const deepPopulate = require('mongoose-deep-populate')(mongoose);

const TweetSchema = new mongoose.Schema({
    userId: {
         type: Schema.Types.ObjectId,
         ref: 'User',
         required: true
    },
    tweet: {
         type: String
    }


}, {
     timestamps: true
});

TweetSchema.plugin(deepPopulate);
module.exports = mongoose.model('Tweet', TweetSchema);