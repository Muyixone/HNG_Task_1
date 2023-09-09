const express = require('express');
const createTrack = require('../controller/create_track');

const router = express.Router();

router.post('/create', createTrack);

module.exports = router;
