const router = require('express').Router();

const usernameRoutes = require('./usernameRoutes');


router.use('/username', usernameRoutes);

module.exports = router;
