const router = require('express').Router();
const {
  getUsernames,
  getSingleUsername,
  createUsername,
  updateUsername,
  deleteUsername,
  getUsername,
 
} = require('../../controllers/usernamecontroller');

router.route('/').get(getUsername).post(createUsername);

router.route('/:userId').get(getSingleUsername).put(updateUsername).delete(deleteUsername);