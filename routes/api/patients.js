const express = require('express');
const router = express.Router();
var bcryptjs = require('bcryptjs');

//loading the model
const Patient= require('../../models/Patient');
const patientController = require('./../../controllers/patientController');

// @route GET api/patients/tests
// @desc tests patients test
// @access Public
router.get('/test',(req,res)=> res.json({msg: 'patients work!'}));


// @route GET api/patients/patientsList
// @desc loads patients table from db
// @access Public
router.get('/patientsList', patientController.patient_list);

// @route post api/patients/register
// @desc  Register Patient
// @access Public
router.post('/register',patientController.patient_register);

// @route post api/patients/delete/id
// @desc  delete patient
// @access Public
// delete by health Card which is patientID
router.delete('/delete/:id', patientController.patient_delete);



// @route put api/update/id
// @desc  update patient
// @access Public
router.put('/update', patientController.patient_update);




module.exports = router;
