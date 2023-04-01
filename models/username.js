const { Schema, model } = require('mongoose');


// Schema to create User 
const usernameSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],

    },

  thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

usernameSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});


const Username = model('Username', usernameSchema);

module.exports = Username;