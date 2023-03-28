const { Schema } = require('mongoose');

const emailSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: true.emailAddress
    }
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = emailSchema;

















