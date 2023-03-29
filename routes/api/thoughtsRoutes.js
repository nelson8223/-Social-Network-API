const router = require('express').Router();
const {
  getthoughts,
  getSinglethoughts,
  createthoughts,
  deletethoughts,
  addthought,
  removethought,
} = require('../../controllers/thoughtsController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThoughts).put(updateThoughts).delete(deletethoughts);

// /api/users/:usernameId/thoughts
router.route('/:usernameId/thoughts').post(addthought);

// /api/users/:usernameId/thoughts/:thoughtId
router.route('/:usernameId/thoughts/:thoughtId').delete(removethought);

module.exports = router;
