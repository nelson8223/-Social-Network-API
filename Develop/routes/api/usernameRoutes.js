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
router.route('/').get(getthoughts).post(createthoughts);

// /api/thoughts/:usernameId
router.route('/:usernameId').get(getSinglethoughts).delete(deletethoughts);

// /api/users/:usernameId/thoughts
router.route('/:usernameId/thoughts').post(addthought);

// /api/users/:usernameId/thoughts/:thoughtId
router.route('/:usernameId/thoughts/:thoughtId').delete(removethought);

module.exports = router;
