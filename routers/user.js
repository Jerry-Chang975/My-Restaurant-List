const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
  })
);

router.post('/logout', (req, res) => {
  req.logout((error) => {
    if (error) next(error);
    return res.redirect('/users/login');
  });
});

module.exports = router;
