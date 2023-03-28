const router = require('express').Router();
const courseRoutes = require('./courseRoutes');
const studentRoutes = require('./usernameRoutes');

router.use('/courses', courseRoutes);
router.use('/students', studentRoutes);

module.exports = router;
