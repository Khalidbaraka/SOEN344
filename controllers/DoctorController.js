//Doctor Model
const Doctor = require('./../models/Doctor');
const Room = require('./../models/Room');
const Timeslot = require('./../models/Timeslot');
var bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./../config/keys');
const HelperController = require('./HelperController');
const userFactory = require('./userFactoryController');

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

                let object = {
                    permitNumber: req.body.permitNumber,
                    password: req.body.password,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    speciality: req.body.speciality,
                    city: req.body.city,
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

// Get list of timeslots available
exports.doctor_get_schedule = (req, res) =>{
    Doctor.findOne({permitNumber: req.params.permit_number})
        .populate('schedules')
            .then(doctor =>{
                res.json(doctor.schedules);
                })
            .catch(err => res.status(404).json({
                success: false
         }))
};

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
    }).populate('schedules')
    .then(doctor => {
        appStart = new Date(req.body.start);
        appEnd = new Date(req.body.end);
        durationTime = (appEnd.getHours() - appStart.getHours()) * 60 + appEnd.getMinutes() - appStart.getMinutes();
        let answer = false
        let roomOccupied = [];
        let personalTimeConflict = false;

        Timeslot.find().populate('doctor').populate('room')
        .then(timeslot => {
            for (var i=0; i<timeslot.length; i++) {
                let start = timeslot[i].start;
                let end = timeslot[i].end;
                roomNumber = timeslot[i].room.number;
                answer = HelperController.overlaps(appStart, appEnd, start, end); 
     
                if(answer == true && timeslot[i].doctor.permitNumber==doctor.permitNumber){
                    personalTimeConflict = true;
                    break;
                } 

                if (answer == true && roomOccupied.length >= 5){
                    break;
                }
                
                if (answer == true && roomOccupied.length < 5){
                    roomOccupied.push(roomNumber);
                }

            }

            if (personalTimeConflict == true){
                res.status(400).json({
                    success: false,
                    message: 'The selected timeslot conflicts with your own schedule'
                });
            }
            else if(roomOccupied.length >= 5){
                res.status(400).json({
                    success: false,
                    message: 'Timeslot overlaps with an already existing timeslot'
                });
            }
            else{
                roomAvailable = 1;
                for(var j = 0; j<=roomOccupied.length; j++){
                    if(!roomOccupied.includes(j+1)){
                        roomAvailable = j+1
                        break;
                    }    
                    }
                Room.findOne({
                    number : roomAvailable
                }).then( room => { 

                    const newTimeslot = new Timeslot({
                        doctor: doctor._id,
                        start: appStart,
                        end: appEnd,
                        duration : durationTime.toString(),
                        room: room._id
                    });

                    newTimeslot.save();//.then(newTimeslot => res.json(newTimeslot)); It was sending two res.json() (check the one in the bottom), so its throwing me a warning in the terminal.
                    doctor.schedules.push(newTimeslot); 
                    doctor.save();
                    res.json(doctor);
                })
            }
        })
    })
}

exports.doctor_delete_timeslot = (req, res) => {
    Timeslot.findById(req.params.timeslotId).populate({
        path: 'doctor',
        populate: {path: 'appointments'}
    })
        .then(timeslot => {
            // check if the doctor has an appointment at the time
            for (let appointment of timeslot.doctor.appointments) { // NOTE: Using array Iterator
                if (HelperController.overlaps(appointment.start, appointment.end, timeslot.start, timeslot.end)) {
                    return res.status(400).json({
                        success: false,
                        message: 'You have an appointment during this time',
                        conflictingAppointment: appointment,
                    });
                }
            }

            // if reach here, delete the timeslot (Note: pre is set in Timeslot.js to auto delete doctors reference to the timeslot)
            timeslot.remove().then(() => {
                res.json({
                    success: true,
                    message: 'The scheduled time has been removed',
                });
            });

        }).catch(() => {
            // unexpected error
            res.status(404).json({
                success: false,
                message: 'The timeslot you wanted to remove was not found',
            });
    })
}

exports.doctor_update_timeslot = (req, res) => {
    let timeslotToEditId = req.body.id;
    let newStart = new Date(req.body.start);
    let newEnd = new Date(req.body.end);

    let timeslotToEdit;
    let roomOccupied = [];
    Doctor.find().populate({
        path: 'schedules',
        populate: {path: 'doctor room'}
    })
        .then(allDoctors => {
            // all doctors to all timeslots owned by a doctor
            let allTimeslots = [];

            //allTimeslots = allDoctors.flatMap(doctor => doctor.schedules); NOTE: Seems our version of Node.js doesn't support this
            let arrayOfScheduleArrays = allDoctors.map(doctor => doctor.schedules);
            for (let scheduleArray of arrayOfScheduleArrays) {
                allTimeslots = allTimeslots.concat(scheduleArray);
            }

            // set the timeslot that wil be edited
            timeslotToEdit = allTimeslots.find(ts => ts._id == timeslotToEditId);

            // make sure the timeslot was found
            if (timeslotToEdit === undefined) {
                return res.status(400).json({
                    success: false,
                    message: "The timeslot was not found",
                });
            }

            for (let scheduledTimeslot of allTimeslots) {
                // true if the schedules take place in in different rooms and those rooms are for different doctors
                let noRoomConflict = scheduledTimeslot.room.number !== timeslotToEdit.room.number &&
                    scheduledTimeslot.doctor.permitNumber !== timeslotToEdit.doctor.permitNumber;

                // ignore the timeslot being edited or if no room conflict
                if (scheduledTimeslot._id == timeslotToEditId || noRoomConflict) {
                    continue;
                }

                let roomNumber = scheduledTimeslot.room.number;
                let isOverlapping = HelperController.overlaps(newStart, newEnd, scheduledTimeslot.start, scheduledTimeslot.end);
                // check the schedules dont overlap and if it's a different doctor, check if another room is available
                if (isOverlapping &&
                    (scheduledTimeslot.doctor.permitNumber === timeslotToEdit.doctor.permitNumber || roomOccupied.length >= 5)) {
                    return res.status(400).json({
                        success: false,
                        message: "The scheduled time conflicts with a time that's already scheduled",
                        conflictingSchedule: scheduledTimeslot,
                    });
                }
                if (isOverlapping && roomOccupied.length < 5) {
                    roomOccupied.push(roomNumber);
                }
            }

            let roomNumber = 1;
            for (let o = 0; o <= roomOccupied.length; o++) {
                if (!roomOccupied.includes(o + 1)) {
                    roomNumber = o + 1;
                    break;
                }
            }

            Doctor.findOne({_id: timeslotToEdit.doctor._id}).populate('appointments')
                .then(doctor => {
                    Room.findOne({
                        number: roomNumber
                    }).then(room => {
                        for (let appointment of doctor.appointments) {
                            // find an appointment apart of the schedule and make sure the new dates wont break it
                            if (HelperController.overlaps(appointment.start, appointment.end, timeslotToEdit.start, timeslotToEdit.end)
                                && !HelperController.within(appointment.start, appointment.end, newStart, newEnd)) {
                                return res.status(400).json({
                                    success: false,
                                    message: 'You have an appointment that conflicts with this change',
                                    conflictingAppointment: appointment,
                                });
                            }
                        }
                        // if got here, we can do the update
                        Timeslot.updateOne({_id: timeslotToEditId},
                            {"$set": {"start": newStart, "end": newEnd, "room": room._id}})
                            .then(() => {
                                return res.json({
                                    success: true,
                                    message: 'The scheduled time has been updated',
                                });
                            })
                    })
                })
        })
}
