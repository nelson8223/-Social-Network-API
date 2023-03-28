const router = require('express').Router();
const thoughtsRoutes = require('./thoughtsRoutes');
const usernameRoutes = require('./usernameRoutes');

router.use('/thoughts', thoughtsRoutes);
router.use('/username', usernameRoutes);

module.exports = router;
