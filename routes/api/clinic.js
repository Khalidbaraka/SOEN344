const express = require('express');
const router = express.Router();

const controller = require('../../controllers/Controller');

// @route get api/clinic/get_all
// @desc  Get all Clinics
// @access Public
router.get('/get_all', controller.getClinics);

// @route get api/clinic/:id/get
// @desc  Get a clinic by its id
// @access Public
router.get('/:clinic_id/get', controller.getClinicById);

module.exports = router;