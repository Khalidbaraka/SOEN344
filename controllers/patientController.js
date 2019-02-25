// Patient Model
const Patient = require('./../models/Patient');
var bcryptjs = require('bcryptjs');

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
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
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

// delete a patient from db
exports.patient_delete = (req, res) => {
    Patient.findById(req.params.id)
        .then(patient => patient.remove()
            .then(() => res.json({success: true}))
        ).catch(err => res.status(404).json({success: false}));
}

// update an exisitig object
exports.patient_update = (req,res) => {
    Patient.findOneAndUpdate({healthCardNumber: req.body.healthCardNumber}, { $set:
            {
                firstname: req.body.firstname,
                lastname: req.body.lastname, 
                password: req.body.password
            }
    }, {new: true} ).then(patient => res.json(patient));


}

