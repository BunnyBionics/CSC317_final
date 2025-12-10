const express = require('express');
const { requireLogin } = require('../middleware/auth');
const path = require("path");
const db = require(path.join(__dirname, "..", "data", "database.js"));

const router = express.Router();

router.get('/dashboard', requireLogin, (req, res) => {
  res.render('dashboard', { title: 'Dashboard' });
});

router.get('/profile', requireLogin, async (req, res, next) => {
  try {
    const user = await findUserById(req.session.userId);
    if (!user) {
      req.session.error = 'User not found.';
      return res.redirect('/login');
    }
    res.render('profile', { title: 'Your Profile', user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
