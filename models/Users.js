const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
     first_name:{
          type: String,
          required:[ true, 'Please add a firstName']
     },
     last_name:{
          type: String,
          required: [true, 'Please add your lastName']
     },
     email: {
          type: String,
          match: [
               /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
               'Please add a valid email',
           ]
     },
     password:{
          type: String,
          required:[true, 'Please password is required' ]
     },

}, {
     timestamps: true
});
module.exports = mongoose.model('User', UserSchema);