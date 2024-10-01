const express = require('express');
const { createBid, getAllBids } = require('../controllers/bidController');
const router = express.Router();

router.post('/create', createBid);
router.get('/', getAllBids); 

module.exports = router;
