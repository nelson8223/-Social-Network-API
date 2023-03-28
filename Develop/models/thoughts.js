const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  reactions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Reaction'
    }
  ]
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

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});


thoughtSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

const Thought = model('Thought', thoughtSchema);
const User = model('User', userSchema);

module.exports = { Thought, User };
