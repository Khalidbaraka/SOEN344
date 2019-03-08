const express = require('express');
const router = express.Router();

//loading the model
const doctorController = require('../../controllers/DoctorController');
const decoder = require('../../middleware');


// @route post api/doctors/register
// @desc  Register Doctor
// @access Public
router.post('/register', doctorController.doctor_register);

// @route post api/doctors/login
// @desc  Login Doctor
// @access Public
router.post('/login', doctorController.doctor_login);

// Protecting the routes below. The order is important
router.use(decoder);

// @route GET api/doctors/getDoctorsList
// @desc Get doctor by permit number
// @access Public
router.get('/getDoctorsList', doctorController.doctor_get_list);

// @route GET api/doctors/getDoctorByPermit
// @desc Loads doctors table from db
// @access Public
router.get('/getDoctorByPermit', doctorController.doctor_get_by_permit);

// @route put api/doctors/update/permit_number
// @desc  Update Doctor
// @access Public
router.put('/update/:permit_number', doctorController.doctor_update);

// @route post api/doctors/delete
// @desc  Delete Doctor
// @access Public
router.delete('/delete/:permit_number', doctorController.doctor_delete);

module.exports = router;
