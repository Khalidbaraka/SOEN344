const express = require('express');
const router = express.Router();
var bcryptjs = require('bcryptjs');

//loading the model
const Patient= require('../../models/Patient');

// @route GET api/patients/tests
// @desc tests patients test
// @access Public
router.get('/test',(req,res)=> res.json({msg: 'patients work!'}));



// @route post api/patients/register
// @desc  Register Patient
// @access Public
router.post('/register',(req,res)=> {
    //mongos command to go to db and then find that id
    Patient.findOne({patientID: req.body.patientID})
        .then(patient  => {
            if (patient) {
                return res.status(400).json({patientID: 'patient file already exists'});
            } else {
                const newPatient = new Patient({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    patientID: req.body.patientID,
                    password: req.body.password
                });

                bcryptjs.genSalt(10,(err, salt)=>{
                    bcryptjs.hash(newPatient.password, salt, (err,hash)=>{
                        if(err) {throw err;}
                        newPatient.password=hash;
                        newPatient.save().then(patient => res.json(patient)).catch(err=>console.log(err));
                    })

                })







            }
        });


});



module.exports = router;
