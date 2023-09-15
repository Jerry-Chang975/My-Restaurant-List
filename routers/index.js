const express = require('express');
const router = express.Router();
const restaurantRoute = require('./restaurant');

router.use('/', restaurantRoute);

module.exports = router;
