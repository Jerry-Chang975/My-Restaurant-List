const express = require('express');
const router = express.Router();
const restaurantRoute = require('./restaurant');
const userRouter = require('./user');

const passport = require('../config/passport');
const authHandler = require('../middlewares/auth-handler');

router.use('/restaurants', authHandler, restaurantRoute);
router.use('/users', userRouter);
router.get('/', (req, res) => res.redirect('/restaurants'));

module.exports = router;
