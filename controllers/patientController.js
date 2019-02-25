// Patient Model
const Patient = require('./../models/Patient');
var bcryptjs = require('bcryptjs');

//  Callback functions that they will invoke on our routes

// Display list of all items.
exports.patient_list = (req, res) => {
    Patient.find().then(patients => res.json(patients))
}


// register/create patient
exports.patient_register = (req,res)=>{

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


}

