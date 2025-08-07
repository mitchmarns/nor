const express = require('express');
const router = express.Router();
const connectionController = require('../controllers/connectionController');
router.post('/:id/songs/add', connectionController.addSong);

router.get('/:id', connectionController.getConnection);

module.exports = router;