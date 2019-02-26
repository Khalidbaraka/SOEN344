const express = require('express');
const router = express.Router();


const nurse_controller = require ('./../../controllers/NurseController.jsx');

// @route post api/nurse/register
// @desc  Register Nurse
// @access Public
router.post('/register', nurse_controller.nurse_register);







module.exports = router;