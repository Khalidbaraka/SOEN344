const express = require('express');
const router = express.Router();

const controller = require('../../controllers/Controller');
const decoder = require('../../middleware');

// @route post api/patients/register
// @desc  Register Patient
// @access Public
router.post('/register', controller.patientRegister);

// @route post api/patients/login
// @desc  Login Patient
// @access Public
router.post('/login', controller.patientLogin);

// @route post api/patients/appointment/delete
// @desc  Delete Appointment
// @access Public
router.delete('/:health_card_number/appointment/:id/delete', controller.deleteAppointment);

// @route get api/patients/health_card_number/appointment/get
// @desc  update patient
// @access Public
router.get('/:health_card_number/appointment/get', controller.getAllAppointments);

// Protecting the routes below. The order is important
//router.use(decoder); // Comment out for api testing

// @route GET api/patients/patientsList
// @desc loads patients table from db
// @access Public
router.get('/patientsList', controller.patientList);

// @route post api/patients/delete/id
// @desc  delete patient
// @access Public
// router.delete('/delete/:id', patientController.patient_delete);

// @route put api/patients/update/id
// @desc  update patient
// @access Public
// router.put('/update/:id', patientController.patient_update);

// @route post api/patients/:health_card_number/cart/checkout
// @desc  update patient
// @access Public
router.post('/:health_card_number/cart/checkout', controller.checkoutAppointment);

// @route post api/patients/:health_card_number/cart/get
// @desc  returns patient cart
// @access Public
router.get('/:health_card_number/cart/get', controller.returnCart);

// @route delete api/patients/:health_card_number/cart/delete
// @desc  deletes an entry on patient cart
// @access Public
router.put('/:health_card_number/cart/delete', controller.deleteCartEntry);

// @route post api/patients/:health_card_number/cart/save
// @desc  update patient
// @access Public
router.post('/:health_card_number/cart/save', controller.saveToCart);

// @route put api/patients/health_card_number/appointment/update
// @desc  update patient
// @access Public
router.put('/:health_card_number/appointment/update', controller.updateAppointment);

module.exports = router;
