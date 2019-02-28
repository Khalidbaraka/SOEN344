const express = require('express');
const router = express.Router();
var bcryptjs = require('bcryptjs');

//loading the model
const Doctor= require('../../models/Doctor');
const doctorController = require('../../controllers/doctorController');

// @route post api/doctors/register
// @desc  Register Doctor
// @access Public
router.post('/register', doctorController.doctor_register);

// @route GET api/doctors/getDoctorsList
// @desc Get doctor by permit number
// @access Public
router.get('/getDoctorsList', doctorController.doctor_get_list);

// @route GET api/doctors/getDoctorByPermit
// @desc Loads doctors table from db
// @access Public
router.get('/getDoctorByPermit', doctorController.doctor_get_by_permit);

// @route post api/doctors/login
// @desc  Login Doctor
// @access Public
router.post('/login', doctorController.doctor_login);

// @route put api/doctors/update/permit_number
// @desc  Update Doctor
// @access Public
router.put('/update/:permit_number', doctorController.doctor_update);

// @route post api/doctors/delete
// @desc  Delete Doctor
// @access Public
router.delete('/delete', doctorController.doctor_delete);

module.exports = router;
