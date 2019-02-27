const express = require('express');
const router = express.Router();


const nurse_controller = require ('./../../controllers/NurseController.js');


// @route POST api/nurses/register
// @desc  Register Nurse
// @access Public
router.post('/register', nurse_controller.nurse_register);

// @route POST api/nurses/register
// @desc  Login Nurse
// @access Public
router.post('/login', nurse_controller.nurse_login);

// @route GET api/nurses/nursesList
// @desc get list of nurses from db
// @access Public
router.get('/nursesList', nurse_controller.nurse_list);

// @route GET api/nurses/select
// @desc get a nurse by the nurse's accessID (nurse in req body)
// @access Public
router.get('/select', nurse_controller.nurse_by_access_id);

// @route PUT api/nurses/editPassword
// @desc  Change a Nurse's password
// @access Public
router.put('/editPassword', nurse_controller.change_nurse_password);

// @route DELETE api/nurses/delete
// @desc  remove a nurse from the db
// @access Public
router.delete('/delete', nurse_controller.nurse_delete);

module.exports = router;
