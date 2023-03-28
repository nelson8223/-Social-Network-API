const { Schema, model } = require('mongoose');
const emailSchema = require('./Email');

// Schema to create User 
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    emails: [emailSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('User', userSchema);

module.exports = User;