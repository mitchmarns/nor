const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

// Show create team form
router.get('/create', teamController.getCreateTeam);

// Handle create team form submission
router.post('/create', teamController.createTeam);

// List all teams
router.get('/', teamController.getAllTeams);

// Get team profile
router.get('/:id', teamController.getTeam);

// Get team edit form
router.get('/:id/edit', teamController.getEditTeam);

// Handle edit team form submission
router.post('/:id/edit', teamController.updateTeam);

module.exports = router;