const Nurse = require('../models/Nurse');
const Patient = require('./../models/Patient');
const Doctor = require('./../models/Doctor');
const jwt = require('jsonwebtoken');
const config = require('./../config/keys');
let bcryptjs = require('bcryptjs');

exports.patient_login_strategy = (req, res) => {
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





}




exports.doctor_login_strategy = (req, res) => {
    Doctor.findOne({
        permitNumber: req.body.permitNumber
    })
        .then(doctor => {
            if (doctor) {
                if (bcryptjs.compareSync(req.body.password, doctor.password)) {
                    const payload = {
                        permitNumber: doctor.permitNumber,
                        firstName: doctor.firstName,
                        lastName: doctor.lastName,
                        speciality: doctor.speciality,
                        clinic: doctor.clinic
                    };

                    var token = jwt.sign(payload, config.secret, {
                        expiresIn: 86400 //24h
                    });

                    res.json({
                        success: true,
                        message: 'Doctor Logged in Succesfully',
                        token: token
                    });

                } else {
                    res.json({
                        success: false,
                        message: 'Incorrect Permit Number or Password'
                    });
                }
            } else {
                res.json({
                    success: false,
                    message: 'Incorrect Permit Number or Password'
                });
            }
        })
}

exports.nurse_login_strategy = (req, res) => {

    Nurse.findOne({
        accessID: req.body.accessID
    })
        .then(nurse => {
            if (nurse) {
                if (bcryptjs.compareSync(req.body.password, nurse.password)) {
                    const payload = {
                        accessID: nurse.accessID,
                        firstName: nurse.firstName,
                        lastName: nurse.lastName,
                        clinic: nurse.clinic
                    };

                    var token = jwt.sign(payload, config.secret,{
                        expiresIn: 86400 //24h
                    });

                    res.json({
                        success: true,
                        message: 'Nurse Logged in Succesfully',
                        token: token
                    });
                } else {
                    res.json({
                        success: false,
                        message: "Incorrect Password"
                    });
                }
            } else {
                res.json({
                    message: "Incorrect Nurse Access ID"
                });
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })

}