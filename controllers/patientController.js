// Patient Model
const Patient = require('./../models/Patient');
const bcryptjs = require('bcryptjs');

//  Callback functions that they will invoke on our routes

// Display list of all items.
exports.patient_list = (req, res) => {
    Patient.find().then(patients => res.json(patients))
}

// register/create patient
exports.patient_register = (req,res) =>{

    Patient.findOne({healthCardNumber: req.body.healthCardNumber})
        .then(patient  => {
            if (patient) {
                return res.status(400).json({healthCardNumber: 'Patient file already exists'});
            } else {
                const newPatient = new Patient({
                    healthCardNumber: req.body.healthCardNumber,
                    birthday: req.body.birthday,
                    gender: req.body.gender,
                    phoneNumber: req.body.phoneNumber,
                    physicalAddress: req.body.physicalAddress,
                    emailAddress: req.body.emailAddress,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: req.body.password
                });

                bcryptjs.genSalt(10,(err, salt)=>{
                    bcryptjs.hash(newPatient.password, salt, (err,hash)=>{
                        if(err) {throw err;}
                        newPatient.password=hash;
                        newPatient.save().then(patient =>
                            res.json(patient)).catch(err=>console.log(err));
                            res.json({
                                success: true,
                            });
                    })
                })
            }
        });
}

//login
exports.patient_login = (req, res) => {

    Patient.findOne({
        healthCardNumber: req.body.healthCardNumber
    })
    .then(patient => {
        if(patient) {
            if(bcryptjs.compareSync(req.body.password, patient.password))
            {
                res.json
                ({ 
                    success: true,
                    message: 'Patient Logged in Successfully'
                });
            }
            else {
                res.json({ 
                    success: false,
                    message: "Incorrect Password"});
            }
        }
        else {
            res.json({ message: "Incorrect Patient Health Card Number"});
        }
    })
        .catch(err => {
            res.send('error: ' + err)
        })
};

// delete a patient from db
exports.patient_delete = (req, res) => {
    Patient.findById(req.params.id)
        .then(patient => patient.remove()
            .then(() => res.json({success: true}))
        ).catch(err => res.status(404).json({success: false}));
}

// update an existing object
exports.patient_update = (req,res) => {
    Patient.findOneAndUpdate({healthCardNumber: req.body.healthCardNumber}, { $set:
            {
                healthCardNumber: req.body.healthCardNumber,
                birthday: req.body.birthday,
                gender: req.body.gender,
                phoneNumber: req.body.phoneNumber,
                physicalAddress: req.body.physicalAddress,
                emailAddress: req.body.emailAddress,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password
            }
    }, {new: true} ).then(patient => res.json(patient));


}

