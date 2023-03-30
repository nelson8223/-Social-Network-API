const router = require('express').Router();
const {
  getUsernames,
  getSingleUsername,
  createUsername,
  updateUsername,
  deleteUsername
} = require('../../controllers/usernameController');

router.route('/').get(getUsernames).post(createUsername);
router.route('/:usernameId').get(getSingleUsername).put(updateUsername).delete(deleteUsername);
