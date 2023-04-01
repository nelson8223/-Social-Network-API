const { Thought, User } = require('../models');

const thoughtController = {
  getthoughts(req, res) { 
    Thoughts.find()
      .then((thoughts) => res.json(thoughts)) 
      .catch((err) => res.status(500).json(err));
  },

  getsinglethoughts(req, res) { 
    Thoughts.findOne({ _id: req.params.ThoughtsId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that id' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  createthoughts(req, res) { 
    Thoughts.create(req.body)
      .then((thought) => {
        return Thoughts.findOneAndUpdate(
          { _id: req.body.postId },
          { $push: { thoughts: thought._id } }, 
          { new: true }
        );
      })
      .then((post) =>
        !post
          ? res
              .status(404)
              .json({ message: 'Thought created, but no post found with this ID' })
          : res.json({ message: 'Thought created' })
      )
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  deletethoughts(req, res) {
    Thoughts.findOneAndRemove({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }

        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'Thought created wth this id!' });
        }
        res.json({ message: 'Thought deleted!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  removethought(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { thoughts: { thoughtsId: req.params.thoughtsId } } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  addreaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};

module.exports = thoughtsController;
