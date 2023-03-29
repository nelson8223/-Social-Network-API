const { Thoughts } = require('../models/thoughts');

module.exports = {
  getThoughts(req, res) { 
    Thoughts.find()
      .then((thoughts) => res.json(thoughts)) 
      .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) { 
    Thoughts.findOne({ _id: req.params.ThoughtsId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that id' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) { 
    Thoughts.create(req.body)
      .then((thought) => {
        return Post.findOneAndUpdate(
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
};
