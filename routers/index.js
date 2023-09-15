const express = require('express');
const router = express.Router();
const restaurantRoute = require('./restaurant');
const userRouter = require('./user');

router.use('/', restaurantRoute);
router.use('/user', userRouter);

module.exports = router;
