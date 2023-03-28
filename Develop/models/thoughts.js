const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Thought'
  }]
});

toJSON: {
  virtuals: true,
}
id: false,



postSchema.virtual('reactionCount').get(function () {
return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);
const User = model('User', userSchema);

module.exports = { Thought, User };