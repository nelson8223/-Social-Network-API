const router = require('express').Router();
const {
  getusernames,
  getsingleusername,
  createusername,
  updateusername,
  deleteusername,
  addthoughts,
  
} = require('../../controllers/usernameController');

router.route('/').get(getusernames).post(createusername);


router.route('/:usernameId').get(getsingleusername).put(updateusername).delete(deleteusername);
