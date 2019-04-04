const express = require('express');
const router = express.Router();

const controller = require('./../../controllers/Controller');
const decoder = require('../../middleware');

// @route POST api/nurses/register
// @desc  Register Nurse
// @access Public
router.post('/:clinic_id/register', controller.nurseRegister);

// @route POST api/nurses/register
// @desc  Login Nurse
// @access Public
router.post('/login', controller.nurseLogin);

// @route GET api/nurses/nursesList
// @desc get list of nurses from db
// @access Public
router.get('/nursesList', controller.nurseList);

// @route GET api/nurses/select
// @desc get a nurse by the nurse's accessID (nurse in req body)
// @access Public
// router.get('/select/', nurse_controller.nurse_by_access_id);

// @route PUT api/nurses/editPassword
// @desc  Change a Nurse's password
// @access Public
// router.put('/editPassword', nurse_controller.change_nurse_password);

// @route DELETE api/nurses/delete
// @desc  remove a nurse from the db
// @access Public
// router.delete('/delete', nurse_controller.nurse_delete);

// @route post api/nurses/access_id/health_card_number/create
// @desc  create new appointment for patient
// @access Public
router.post('/:access_id/:health_card_number/appointment/create', controller.createAppointment);

// @route post api/patients/appointment/delete
// @desc  Delete Appointment
// @access Public
router.delete('/:health_card_number/appointment/:id/delete', controller.deleteAppointment);

// Protecting the routes below. The order is important
//router.use(decoder);

module.exports = router;