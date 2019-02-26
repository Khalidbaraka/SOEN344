const express = require('express');
const router = express.Router();


const nurse_controller = require ('./../../controllers/NurseController.js');


// @route post api/nurse/register
// @desc  Register Nurse
// @access Public
router.post('/register', nurse_controller.nurse_register);

// @route post api/nurse/register
// @desc  Register Nurse
// @access Public
router.post('/login', nurse_controller.nurse_login);





module.exports = router;