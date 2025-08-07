const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');

router.get('/', characterController.getAllCharacters);
router.get('/create', characterController.getCreateCharacter);
router.post('/create', characterController.createCharacter);
router.get('/:id/edit', characterController.getEditCharacter);
router.post('/:id/edit', characterController.updateCharacter);
router.get('/:id', characterController.getCharacterProfile);
router.post('/:id/gallery/add', characterController.addGalleryImage);
router.post('/:id/connections/add', characterController.addConnection);

module.exports = router;