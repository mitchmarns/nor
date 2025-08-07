const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, (req, res) => {
  res.render('dashboard', {
    title: 'Dashboard',
    user: req.user,
    characters: [],
    threads: [],
    recentMessages: [],
    activities: []
  });
});

module.exports = router;