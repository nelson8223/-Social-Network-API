const router = require('express').Router();
const {
  getthoughts,
  getsinglethoughts,
  createthoughts,
  deletethoughts,
  removethought,
  addreaction

} = require('../../controllers/thoughtsController');

// /api/thoughts
router.route('/').get(getthoughts).post(createthoughts);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getsinglethoughts).put(updatethoughts).delete(deletethoughts);

// /api/users/:usernameId/thoughts
router.route('/:thoughtId/reactions').post(addreaction);

// /api/users/:usernameId/thoughts/:thoughtId
router.route('/:usernameId/thoughts/:thoughtId').delete(removethought);

module.exports = router;
