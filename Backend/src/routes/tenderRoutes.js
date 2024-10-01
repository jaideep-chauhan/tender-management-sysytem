const express = require('express');
const { createTender, getTenders } = require('../controllers/tenderController');
const router = express.Router();

router.post('/create', createTender);
router.get('/', getTenders);

module.exports = router;
