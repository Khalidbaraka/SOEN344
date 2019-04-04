const express = require('express');
const router = express.Router();

const controller = require('../../controllers/Controller');

// @route get api/clinic/get_all
// @desc  Get all Clinics
// @access Public
router.get('/get_all', controller.getClinics);

module.exports = router;