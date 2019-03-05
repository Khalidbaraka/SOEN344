const express = require('express');
const router = express.Router();

//loading the model
const patientController = require('./../../controllers/patientController');
const decoder = require('../../middleware');

// @route post api/patients/register
// @desc  Register Patient
// @access Public
router.post('/register', patientController.patient_register);

// @route post api/patients/login
// @desc  Login Patient
// @access Public
router.post('/login', patientController.patient_login);

// Protecting the routes below. The order is important
router.use(decoder);

// @route GET api/patients/patientsList
// @desc loads patients table from db
// @access Public
router.get('/patientsList', patientController.patient_list);

// @route post api/patients/delete/id
// @desc  delete patient
// @access Public
// delete by health Card which is patientID
router.delete('/delete/:id', patientController.patient_delete);

// @route put api/patients/update/id
// @desc  update patient
// @access Public
router.put('/update/:id', patientController.patient_update);

module.exports = router;
