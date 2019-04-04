const express = require('express');
const router = express.Router();

const controller = require('../../controllers/Controller');
const decoder = require('../../middleware');


// @route post api/doctors/:clinic_id/register
// @desc  Register Doctor
// @access Public
router.post('/:clinic_id/register', controller.doctorRegister);

// @route post api/doctors/login
// @desc  Login Doctor
// @access Public
router.post('/login', controller.doctorLogin);

// @route post api/doctors/:permit_number/schedule/create
// @desc Create Timeslot
// @access Public
router.post('/:permit_number/schedule/create', controller.createTimeslot);


// Protecting the routes below. The order is important
//router.use(decoder); // Comment out for api testing

// @route GET api/doctors/getDoctorsList
// @desc Get doctor by permit number
// @access Public
router.get('/getDoctorsList', controller.doctorList);

// @route GET api/doctors/getDoctorByPermit
// @desc Loads doctors table from db
// @access Public
// router.get('/getDoctorByPermit', doctorController.doctor_get_by_permit);

// @route GET api/doctors/permit_number/schedule/get
// @desc Get schedule of doctor
// @access Public
router.get('/:permit_number/schedule/get', controller.getSchedule);

// @route put api/doctors/update/permit_number
// @desc  Update Doctor
// @access Public
// router.put('/update/:permit_number', doctorController.doctor_update);

// @route post api/doctors/delete
// @desc  Delete Doctor
// @access Public
// router.delete('/delete/:permit_number', doctorController.doctor_delete);

// @route put api/doctors/schedule/update
// @desc  Update a doctor's scheduled timeslot
// @access Public
router.put('/schedule/update', controller.updateTimeslot);

// @route post api/doctors/schedule/delete/:timeslotId
// @desc  Delete a doctor's scheduled timeslot
// @access Public
router.delete('/schedule/delete/:timeslotId', controller.deleteTimeslot);

module.exports = router;