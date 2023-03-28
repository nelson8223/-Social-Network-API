const { ObjectId } = require('mongoose').Types;
const User = require('../models/Username');
const Email = require('../models/email');
const Thought = require('../models/thought');

module.exports = {
  // Get all usernames
  async getusernames(req, res) {
    try {
      const usernames = await User.find();
      const usernamesObj = {
        usernames,
        emails: await Email.find(),
      };
      return res.json(usernamesObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single username
  async getUsername(req, res) {
    try {
      const username = await User.findOne({ _id: req.params.usernameId }).select('-__v').lean();
      if (!username) {
        return res.status(404).json({ message: 'Username not found' });
      }
      const thought = await Thought.findOne({ username: req.params.usernameId });
      return res.json({
        username,
        thought,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Create a new username
  async createUsername(req, res) {
    try {
      const username = await User.create(req.body);
      return res.json(username);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Delete a username and remove it from thoughts
  async deleteUsername(req, res) {
    try {
      const username = await User.findOneAndRemove({ _id: req.params.usernameId });
      if (!username) {
        return res.status(404).json({ message: 'Username not found' });
      }
      const thought = await Thought.findOneAndUpdate(
        { username: req.params.usernameId },
        { $pull: { username: req.params.usernameId } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'Username deleted, but no thought found' });
      }
      return res.json({ message: 'Username successfully deleted' });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Add a thought to a username
  async addThought(req, res) {
    try {
      console.log('You are adding a thought to a username');
      console.log(req.body);
      const username = await User.findOneAndUpdate(
        { _id: req.params.usernameId },
        { $addToSet: { thoughts: req.body } },
        { runValidators: true, new: true }
      );
      if (!username) {
        return res.status(404).json({ message: 'Username not found' });
      }
      return res.json({ message: 'Thought added to username' });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
