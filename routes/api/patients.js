const express = require('express');
const router = express.Router();

//loading the model
const patientController = require('../../controllers/PatientController');
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
//router.use(decoder);

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

// @route get api/patients/health_card_number/appointment/get
// @desc  update patient
// @access Public
router.get('/:health_card_number/appointment/get', patientController.patient_get_appointments);

// @route post api/patients/health_card_number/cart/checkout
// @desc  update patient
// @access Public
router.post('/:health_card_number/cart/checkout', patientController.patient_checkout_appointment);

module.exports = router;
