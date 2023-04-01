const router = require('express').Router();
const {
  getusers,
  getsingleuser,
  createuser,
  updateuser,
  deleteuser,
  addthoughts,
  
} = require('../../controllers/userController');

router.route('/').get(getusers).post(createuser);


router.route('/:userId').get(getsingleuser).put(updateuser).delete(deleteuser);

module.exports = router;
