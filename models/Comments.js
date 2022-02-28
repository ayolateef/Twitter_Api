const mongoose =  require('mongoose');
const {Schema} = mongoose;
const deepPopulate = require('mongoose-deep-populate')(mongoose);


const CommentSchema = new mongoose.Schema({
     text: {
            type: String 
          },
     tweetId: {
          type: Schema.Types.ObjectId,
          ref: 'Tweet',
          required: true
     },
     userId:{
          type:Schema.Types.ObjectId,
          ref: 'User',
          required: true
     },
   
}, {
     timestamps: true
});
CommentSchema.plugin(deepPopulate);
module.exports = mongoose.model('Comment',CommentSchema);