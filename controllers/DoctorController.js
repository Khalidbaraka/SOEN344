//Doctor Model
const Doctor = require('./../models/Doctor');
const Timeslot = require('./../models/Timeslot');
var bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./../config/keys');
const HelperController = require('./HelperController');

//  Callback functions for the routes


//Create / register
exports.doctor_register = (req, res) => {
    Doctor.findOne({
            permitNumber: req.body.permitNumber
        })
        .then(doctor => {
            if (doctor) {
                return res.status(400).json({
                    permitNumber: 'Doctor with this permit number already exists'
                });
            } else {
                const newDoctor = new Doctor({
                    permitNumber: req.body.permitNumber,
                    password: req.body.password,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    speciality: req.body.speciality,
                    city: req.body.city
                });

                bcryptjs.genSalt(10, (err, salt) => {
                    bcryptjs.hash(newDoctor.password, salt, (err, hash) => {
                        if (err) {
                            throw err;
                        }
                        newDoctor.password = hash;
                        newDoctor.save().then(doctor => res.json(doctor)).catch(err => console.log(err));
                    })
                })
            }
        });
}

//Read / getList
exports.doctor_get_list = (req, res) => {
    Doctor.find().then(doctors => res.json(doctors))
}

//Read / get by permit number
exports.doctor_get_by_permit = (req, res) => {
    Doctor.findOne({
            permitNumber: req.body.permitNumber
        })
        .then(doctor => res.json(doctor))
}

//Login
exports.doctor_login = (req, res) => {
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
                    sucess: false,
                    message: 'Incorrect Permit Number or Password'
                });
            }
        })
}

//Update
exports.doctor_update = (req, res) => {
    bcryptjs.hash(req.body.password, 10, (err, hash) => {
        //params is from the routes url, ex /api/doctor/:permit_number/update
        Doctor.findOneAndUpdate({
                permitNumber: req.params.permit_number
            }, {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: hash,
                    speciality: req.body.speciality,
                    city: req.body.city
                }
            })
            .then(doctor => res.json(doctor))
    })
}

//Delete
exports.doctor_delete = (req, res) => {
    Doctor.findOne({permitNumber: req.params.permit_number})
        .then(doctor => doctor.remove()
            .then(() => res.json({
                success: true
            }))
        ).catch(err => res.status(404).json({
            success: false
    }));
}

//Create Timeslot
exports.doctor_create_timeslot= (req, res) => {
    Doctor.findOne({
        permitNumber: req.params.permit_number
    }).populate('schedules') // To be removed
    .then(doctor => {
        appStart = new Date(req.body.start);
        appEnd = new Date(req.body.end);
        let answer = false
        for (var i=0; i<doctor.schedules.length; i++) {
            let start = doctor.schedules[i].start;
            let end = doctor.schedules[i].end;

            answer = HelperController.overlaps(appStart, appEnd, start, end);
            
            if (answer == true){
                break;
            }
        }
        
        if(answer == true){
            res.status(400).json({
                success: false,
                message: 'Timeslot overlaps with an already existing timeslot'
            });
        }
        else{
            const newTimeslot = new Timeslot({
                doctor: doctor._id,
                start:  new Date(req.body.start),
                end:  new Date(req.body.end),
                duration: req.body.duration
            });

            newTimeslot.save().then(newTimeslot => res.json(newTimeslot));
                
            doctor.schedules.push(newTimeslot); 
            doctor.save();
            res.json(doctor);
    }
    }).catch(err => console.log(err));
}