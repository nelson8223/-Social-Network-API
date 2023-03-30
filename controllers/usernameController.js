const { User, Thought } = require('../models');

module.exports = {
  // Get all usernames
  getusername(req, res) {
    User.find()
      .select('-__v')
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Get a single username
  getsingleusername(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Create a new username
  async createusername(req, res) {
    try {
      const username = await User.create(req.body);
      return res.json(username);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Delete a username and remove it from thoughts
  async deleteusername(req, res) {
    try {
      const username = await User.findOneAndRemove({ _id: req.params.usernameId });
      if (!username) {
        return res.status(404).json({ message: 'username not found' });
      }
      const thought = await thought.findOneAndUpdate(
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
  async addthoughts(req, res) {
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

  // Update a username
  updateuser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
