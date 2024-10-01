const express = require('express');
const { createTender, getTenders } = require('../controllers/tenderController');
const router = express.Router();

// Get all list of tenders
router.get('/', getTenders);

// Creta new tender
router.post('/create', createTender);

module.exports = router;
