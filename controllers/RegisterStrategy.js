const Nurse = require('../models/Nurse');
const Patient = require('./../models/Patient');
const Doctor = require('./../models/Doctor');
let bcryptjs = require('bcryptjs');
const Clinic = require('./../models/Clinic');
const userFactory = require('./userFactoryController');


exports.patient_register_strategy = (req, res) => {
    Patient.findOne({
        healthCardNumber: req.body.healthCardNumber
    })
        .then(patient => {
            if (patient) {
                return res.status(400).json({
                    healthCardNumber: 'Patient file already exists'
                });
            } else {

                let object = {
                    healthCardNumber: req.body.healthCardNumber,
                    birthday: req.body.birthday,
                    gender: req.body.gender,
                    phoneNumber: req.body.phoneNumber,
                    physicalAddress: req.body.physicalAddress,
                    emailAddress: req.body.emailAddress,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: req.body.password,
                    appointments: [],
                    cart: []
                }

                const newPatient = userFactory(object, "patient");
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


exports.doctor_register_strategy = (req, res) => {
    Clinic.findById(req.params.clinic_id)
        .then(clinic =>{
            Doctor.findOne({
                permitNumber: req.body.permitNumber
            }).populate('clinic')
                .then(doctor => {
                    if (doctor && doctor.clinic.equals(clinic._id)) {
                        return res.status(400).json({
                            success: false,
                            message: 'Doctor with this permit number already exists'
                        });
                    }
                    if (doctor && !doctor.clinic.equals(clinic._id)) {
                        return res.status(400).json({
                            success: false,
                            message: 'Doctor with this permit number is already working at ' + doctor.clinic.name
                        });
                    }else {

                        let object = {
                            permitNumber: req.body.permitNumber,
                            password: req.body.password,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            speciality: req.body.speciality,
                            city: req.body.city,
                            clinic: clinic._id,
                            appointments: [],
                            schedules: []
                        }

                        const newDoctor = userFactory(object, "doctor");

                        bcryptjs.genSalt(10, (err, salt) => {
                            bcryptjs.hash(newDoctor.password, salt, (err, hash) => {
                                if (err) {
                                    throw err;
                                }
                                newDoctor.password = hash;
                                clinic.doctors.push(newDoctor);
                                clinic.save();
                                newDoctor.save().then(doctor => res.json({success: true, doctor: doctor})).catch(err => console.log(err));
                            })
                        })
                    }
                });
        })
}


exports.nurse_register_strategy = (req, res) => {
    Clinic.findById(req.params.clinic_id)
            .then(clinic =>{
                console.log(" ddd " + req.params.clinic_id)
                console.log(" dsdsd "+ clinic)
                Nurse.findOne({
                    accessID: req.body.accessID
                }).populate('clinic')
                .then(nurse => {
                    if (nurse && nurse.clinic.equals(clinic._id)) {
                        return res.status(400).json({
                            success: false,
                            message: 'Nurse with this access id already exists'
                        });
                    }
                    if (nurse && !nurse.clinic.equals(clinic._id)) {
                        return res.status(400).json({
                            success: false,
                            message: 'Nurse with this access id is already working at ' + nurse.clinic.name
                        });
                    } else {

                        let object = {
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            accessID: req.body.accessID,
                            password: req.body.password,
                            clinic: req.params.clinic_id
                        }

                        const newNurse = userFactory(object, "nurse");

                        bcryptjs.genSalt(10, (err, salt) => {
                            bcryptjs.hash(newNurse.password, salt, (err, hash) => {
                                if (err) {
                                    throw err;
                                }
                                newNurse.password = hash;
                                clinic.nurses.push(newNurse);
                                clinic.save();
                                newNurse.save().then(nurse => res.json({
                                    success: true,
                                    message: 'Signed up!'
                                })).catch(err => {
                                    res.json({
                                        success: false,
                                        message: 'Error: Server error' + err
                                    });
                                })
                            })
                        })
                    }
                });
            })
}