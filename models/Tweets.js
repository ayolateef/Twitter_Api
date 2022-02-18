 const mongoose = require('mongoose');
 const {Schema} = mongoose;

const TweetSchema = new mongoose.Schema({
    userId: {
         type: Schema.Types.ObjectId,
         ref: 'User',
         required: true
    },
    comments: [{
     type:Schema.Types.ObjectId,
     ref: 'Comments',
     required: 'true'
    }],
    tweet: {
         type: String
    }

}, {
     timestamps: true
});
module.exports = mongoose.model('Tweet', TweetSchema);