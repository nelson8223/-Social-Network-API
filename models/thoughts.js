const { Schema, model } = require('mongoose');

const thoughtsSchema = new Schema({
  text: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
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
  ],
  username: {
    type: String,
    required: true
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Thought'
  }]
});

thoughtsSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

thoughtsSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

const Thoughts = model('Thought', thoughtsSchema);

module.exports = Thoughts;
