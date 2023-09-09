const express = require('express');
const getTrack = require('../controller/get_track_info');

const router = express.Router();

router.get('/', getTrack);

module.exports = router;
