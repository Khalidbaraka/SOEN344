// Patient Model
const Patient = require('./../models/Patient');
const Appointment = require('./../models/Appointment');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./../config/keys');

//  Callback functions that they will invoke on our routes

// Display list of all items.
 exports.patient_list = (req, res) => {
    Patient.find().then(patients => res.json(patients))
}

// register/create patient
exports.patient_register = (req, res) => {

    Patient.findOne({
            healthCardNumber: req.body.healthCardNumber
        })
        .then(patient => {
            if (patient) {
                return res.status(400).json({
                    healthCardNumber: 'Patient file already exists'
                });
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
                    password: req.body.password, 
                    appointments: []
                });

                bcryptjs.genSalt(10, (err, salt) => {
                    bcryptjs.hash(newPatient.password, salt, (err, hash) => {
                        if (err) {
                            throw err;
                        }
                        newPatient.password = hash;
                        newPatient.save().then(patient =>
                            res.json(patient)).catch(err => console.log(err));
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
            if (patient) {
                if (bcryptjs.compareSync(req.body.password, patient.password)) {

                    const payload = {
                        healthCardNumber: patient.healthCardNumber,
                        physicalAddress: patient.physicalAddress,
                        emailAddress: patient.emailAddress,
                        firstName: patient.firstName,
                        lastName: patient.lastName,
                    };

                    var token = jwt.sign(payload, config.secret, {
                        expiresIn: 86400 //24h
                    });

                    res.json({
                        success: true,
                        message: 'Patient Logged in Successfully',
                        token: token
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'Incorrect Password'
                    });
                }
            } else {
                res.json({
                    success: false,
                    message: 'Incorrect Patient Health Card Number'
                });
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
            .then(() => res.json({
                success: true
            }))
        ).catch(err => res.status(404).json({
            success: false
        }));
}

// update an existing object
exports.patient_update = (req, res) => {
    Patient.findOneAndUpdate({
        healthCardNumber: req.body.healthCardNumber
    }, {
        $set: {
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
    }, {
        new: true
    }).then(patient => res.json(patient));
}

//Get list of appointments
exports.patient_get_appointments = (req, res) =>{
    Patient.findOne({healthCardNumber: req.params.health_card_number}).populate('appointments')
        .then(patient =>{
            Appointment.find({patient:patient._id})
                .then(appointments =>{
                    let sendToFront = [];
                    if(appointments.length == 0){
                        res.json({
                            message: 'You have no appointments'
                        })
                    }
                    else{
                        for(var i = 0; i< appointments.length; i++){
                            let foundAppointments = new Appointment(appointments[i]);
                            Doctor.findById(foundAppointments.doctor)
                                .then(doctor =>{
                                    Room.findById(foundAppointments.room)
                                        .then(room =>{
                                                sendToFront.push({
                                                _id: foundAppointments._id,
                                                type: foundAppointments.type,
                                                clinic: foundAppointments.clinic,
                                                doctor: doctor.firstName +" " + doctor.lastName,
                                                room: room.number,
                                                start: foundAppointments.start,
                                                end: foundAppointments.end,
                                                duration: foundAppointments.duration,
                                                price: foundAppointments.price
                                            })
                                            if(sendToFront.length == appointments.length)
                                                res.json(sendToFront)
                                        })
                                })
                        }
                    }        
                })
        })
}