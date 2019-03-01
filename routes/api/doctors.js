const express = require('express');
const router = express.Router();
var bcryptjs = require('bcryptjs');
const config = require('../../config/keys');
const jwt = require('jsonwebtoken');

//loading the model
const Doctor= require('../../models/Doctor');
const doctorController = require('../../controllers/doctorController');

// @route post api/doctors/register
// @desc  Register Doctor
// @access Public
router.post('/register', doctorController.doctor_register);

// @route post api/doctors/login
// @desc  Login Doctor
// @access Public
router.post('/login', doctorController.doctor_login);

router.use(function(req, res, next){
	// check header or url parameters or post parameters for token
  var token = req.body.token || req.cookies.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {       
    	if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });       } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;         next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }

});

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
router.delete('/delete', doctorController.doctor_delete);

module.exports = router;
