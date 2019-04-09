// Patient Model
const Patient = require('./../models/Patient');
const Clinic = require('./../models/Patient');
const Appointment = require('./../models/Appointment');
const Room = require('./../models/Room');
const Timeslot = require('./../models/Timeslot');
const Doctor = require('./../models/Doctor');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./../config/keys');
const HelperController = require('./HelperController');
const mongoose = require('mongoose');
const userFactory = require('./userFactoryController');
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

exports.patient_delete_appointment = (req, res) => {
    Patient.findOne({healthCardNumber: req.params.health_card_number}).populate('appointments')
        .then(patient => {
            patient.appointments.pull(req.params.id);
            patient.save();
            Appointment.findOneAndDelete({_id: req.params.id})
                .then(res.json({
                    success: true
                }));
        });
};

//Get list of appointments
exports.patient_get_appointments = (req, res) =>{
    Patient.findOne({healthCardNumber: req.params.health_card_number}).populate('appointments')
        .then(patient =>{
            Appointment.find({patient: patient._id, clinic: req.params.clinic_id})
                .then(appointments =>{
                    let sendToFront = [];
                    if(appointments.length === 0){
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

//Delete a cart entry
exports.patient_delete_cart_entry = (req, res) =>{
    Patient.findOne({healthCardNumber: req.params.health_card_number})
        .then(patient =>{
            patient.cart.pull(req.body.timeslot._id)
            Timeslot.findByIdAndRemove(req.body.timeslot._id)
                .then(timeslot =>{
                    patient.save();
                    res.json(patient)
                }).catch(err => res.status(404).json({
                    success: false
             }))
        })  
}

//Returns Patient Cart
exports.return_patient_cart = (req, res) =>{
    Patient.findOne({healthCardNumber: req.params.health_card_number})
    .populate('cart')
            .then(patient =>{
                res.json(patient.cart);
                })
            .catch(err => res.status(404).json({
                success: false
         }))
};

//Checkout appointments from the cart.
exports.patient_checkout_appointment = (req, res) =>{
    Patient.findOne({healthCardNumber: req.params.health_card_number}).populate('cart').populate('appointments')
        .then(patient => {
            var timeslot = req.body.timeslot;
            var appStart = new Date(timeslot.start);
            var appEnd = new Date(timeslot.end);
            //Use these for local tests.
            //appStart = new Date(req.body.start);
            //appEnd = new Date(req.body.end);
            let annualCheckUpFound = false;
            let roomOverlap = false; 
            let doctorAvailable = false;
            var duration = ((appEnd.getHours() - appStart.getHours()) * 60 )+ (appEnd.getMinutes() - appStart.getMinutes())
            let type =0;
            let price =0; //price for Walk-in is 20 dollars, and anual checkup is 60 dollars
            if(duration == 20){
                type = 0;
                price = 20;
            }
            else if(duration == 60){
                type = 1;
                price = 60;
            }
            else{
                res.status(400).json({
                    message: 'duration of appointment not 20 nor 60 minutes'
                })
            }
            //from https://stackoverflow.com/questions/21069813/mongoose-multiple-query-populate-in-a-single-call
            //var populateQuery = [{path:'room', select:''}]
            Room.find({ clinic: req.params.clinic_id }).sort({number: 1}).collation({locale: "en_US", numericOrdering: true}).populate('appointments')
                .then(rooms =>{
                    Doctor.find({clinic: req.params.clinic_id }).populate('schedules')
                        .then(doctors =>{
                            Appointment.find({ patient: patient._id, clinic: req.params.clinic_id })
                                .then(appointments => {
                                    let i = 0; //room index
                                    let k=0; //doctor index
                                    //Check if patient already has annual check up appointment
                                    if(type == 1){
                                        annualCheckUpFound = HelperController.check_annual_checkup(appointments,type,appStart);
                                    }
                                    if(annualCheckUpFound == false){
                                        while(i<rooms.length){
                                            roomOverlap=HelperController.check_room_overlap(rooms[i],appStart, appEnd);
                                            if (roomOverlap == false){
                                                while(k<doctors.length){
                                                    doctorAvailable = HelperController.check_doctor_available(doctors[k],appStart,appEnd);
                                                    console.log("doc avai11 = " + doctorAvailable.answer + "   " + doctorAvailable.roomFound)
                                                    if(doctorAvailable.answer&& doctorAvailable.roomFound.equals(rooms[i]._id)){
                                                        break;
                                                    }
                                                k++;   
                                                }

                                                if(doctorAvailable.answer ==true && doctorAvailable.roomFound.equals(rooms[i]._id)){
                                                    var newAppointment = new Appointment({
                                                        type: type,
                                                        clinic: req.params.clinic_id,
                                                        doctor: doctors[k]._id,
                                                        room: rooms[i]._id,
                                                        start: appStart,
                                                        patient: patient._id,
                                                        end: appEnd,
                                                        duration: duration.toString(),
                                                        price: price
                                                    })
                                                    newAppointment.save();
                                                    rooms[i].appointments.push(newAppointment);
                                                    rooms[i].save();
                                                    doctors[k].appointments.push(newAppointment);
                                                    doctors[k].save();
                                                    patient.appointments.push(newAppointment);
                                                    //deleting the timeslot from patient's cart
                                                    patient.cart.pull(req.body.timeslot._id)
                                                    Timeslot.findByIdAndRemove(req.body.timeslot._id)
                                                        .then(timeslot =>{
                                                            patient.save();
                                                            return res.json(patient)
                                                        }).catch(err => res.status(404).json({
                                                            success: false
                                                        }))
                                                    }
                                                else{
                                                    return res.status(400).json({
                                                        success: false,
                                                        message: 'Sorry, a room is available in the clinic, but no doctors are available at the selected time '
                                                    });
                                                }                                
                                                break;
                                            }
                                            else if (roomOverlap==true && i>rooms.length){
                                                return res.status(400).json({
                                                    success: false,
                                                    message: 'All rooms in the clinic are occupied at the selected time'
                                                });
                                            }
                                        i++;
                                        }
                                    }
                                    else{
                                        return res.status(400).json({
                                            success: false,
                                            message: 'You already have an annual check up in the clinic for the year. '
                                        });
                                    }
                                })
                        })
                })
        })
}

//Save timeslot to cart
exports.patient_cart_save = (req,res)=>{
        Patient.findOne({healthCardNumber: req.params.health_card_number}).populate('cart').populate('appointments')
            .then(patient =>{
                var type = req.body.type;
                var startTime = new Date(req.body.startTime);
                let duration = 0;
                let price = 0;//price for Walk-in is 20 dollars, and anual checkup is 60 dollars
                let endTime = new Date(req.body.startTime);
                if(type ==0){
                    duration = 20;
                    price = 20;
                    endTime = new Date(endTime.setMinutes(endTime.getMinutes() + duration)); 
                }
                else{
                    duration = 60;
                    price = 60;
                    endTime = new Date(endTime.setHours(endTime.getHours() + 1));
                }  
                let annualCheckUpFound = false; isInCart = false; personalAppointmentOverlap = false;
                let roomOverlap = false; doctorAvailable = false;

                Room.find({ clinic: req.params.clinic_id }).sort({ number: 1 }).collation({ locale: "en_US", numericOrdering: true }).populate('appointments')
                    .then(rooms =>{
                        Doctor.find({clinic: req.params.clinic_id}).populate('schedules')
                            .then(doctors =>{
                                Appointment.find({ patient: patient._id, clinic: req.params.clinic_id})
                                    .then(appointments => {
                                        let i = 0; //room index 
                                        let k=0; //doctor index
                                        //Check if patient already has annual check up appointment
                                        if(type == 1){
                                            annualCheckUpFound = HelperController.check_annual_checkup(appointments,type,startTime);       
                                        }
                                        if(annualCheckUpFound == false){
                                            //second check, check if a timeslot with same startTime is in the cart
                                            isInCart = HelperController.check_is_in_cart(patient,startTime,endTime);
                                            
                                            if(isInCart == false){
                                                //Third check, check if patient already has an appointment at the selected startTime
                                                
                                                personalAppointmentOverlap = HelperController.check_personal_overlap(patient,startTime,endTime);
                                                
                                                if (personalAppointmentOverlap == false){
                                                    //Fourth check, checking for available rooms at the selected time
                                                    while(i<rooms.length){
                                                        roomOverlap=HelperController.check_room_overlap(rooms[i],startTime, endTime);
                                                        if (roomOverlap == false){
                                                            //Fifth check, checking for available doctor at the selected time
                                                            while(k<doctors.length){
                                                                doctorAvailable = HelperController.check_doctor_available(doctors[k],startTime,endTime)
                                                                if(doctorAvailable.answer&& doctorAvailable.roomFound.equals(rooms[i]._id)){
                                                                    break;
                                                                }
                                                                k++;   
                                                            }
                                                            if(doctorAvailable.answer == true && doctorAvailable.roomFound.equals(rooms[i]._id)){
                                                                var newTimeslot = new Timeslot({
                                                                    doctor: doctors[k]._id,
                                                                    start: startTime,
                                                                    end: endTime,
                                                                    duration: duration.toString(),
                                                                    room: rooms[i]._id
                                                                })
                                                                newTimeslot.save();
                                                                patient.cart.push(newTimeslot);
                                                                patient.save()
                                                                return res.json(patient.cart) 
                                                            }
                                                            else{
                                                                return res.status(400).json({
                                                                    success: false,
                                                                    message: 'Sorry, a room is available in the clinic but no doctors are available at the selected time '
                                                                });
                                                            } 
                                                        }
                                                        else if (roomOverlap==true && i>rooms.length){
                                                            return res.status(400).json({
                                                                    success: false,
                                                                    message: 'All rooms in the clinic are occupied at the selected time'
                                                                    });
                                                        }
                                                        i++;
                                                    }
                                                }
                                                else{
                                                    return res.status(400).json({
                                                            success: false,
                                                            message: 'Error. You already have an appointment for the selected time.'
                                                            });
                                                }
                                            }
                                            else{
                                                return res.status(400).json({
                                                        success: false,
                                                        message: 'An appointment with the same time is already in the cart '
                                                        });
                                            } 
                                        }
                                        else{
                                            return res.status(400).json({
                                                    success: false,
                                                    message: 'You already have an annual check up for the year. '
                                                    });
                                        }
                            })
                    })
            })
    })
}

//Updating a patient's appointment
exports.patient_update_appointment = (req, res) => {
    // Request the basic information to update the appointment
    //let appointmentToUpdateId = req.body.appointmentToUpdate.appointmentId;
    //let newType = appointment.type;
    //let newStart = new Date(req.body.appointmentToUpdate.startTime);
    //let newEnd = new Date(req.body.appointmentToUpdate.startTime);

    //replace these 4 for postman tests.
    let appointmentToUpdateId = req.body.appointmentId;
    let newType = req.body.type;
    let newStart = new Date(req.body.startTime);
    let newEnd = new Date(req.body.startTime)

    let duration = 0;
    let price = 0;
    if(newType == 0) {
        duration = 20;
        price = 20;
        newEnd = new Date(newEnd.setMinutes(newEnd.getMinutes() + duration)); 
    } else {
        duration = 60;
        price = 60;
        newEnd = new Date(newEnd.setHours(newEnd.getHours() + 1));
    } 

    let appointmentToUpdate;
    Appointment.find().populate('doctor').populate('room')
        .then(allAppointments => {
            Patient.findOne({healthCardNumber: req.params.health_card_number}).populate('appointments')
                .then(patient=>{
                    let roomOverlap = false; 
                    let doctorAvailable = false;
                    Room.find().sort({'_id': 1}).populate('appointments')
                        .then(rooms =>{
                            Doctor.find().sort({'_id': 1}).populate('schedules')
                                .then(doctors =>{
                                    let j=0; y=0;x=0;
                                    appointmentToUpdate = allAppointments.find(appointment => appointment._id == appointmentToUpdateId);
                                    // make sure the appointment was found
                                    if (appointmentToUpdate === undefined) {
                                        res.status(400).json({
                                            success: false,
                                            message: "The appointment was not found",
                                        });
                                        return;
                                    }
                                    //Return true if the newStart is the same as the start of the appointment to be updated.
                                    if (appointmentToUpdate.start.getTime() === newStart.getTime()){
                                        res.status(400).json({
                                            success: false,
                                            message: "Error, you are trying to update an appointment to the same time",
                                        });
                                        return;
                                    }
                                    for (let scheduledAppointment of allAppointments) {
                                        // true if the appointments take place in different rooms and those rooms are for different appointments
                                        let noRoomConflict = scheduledAppointment.room.number !== appointmentToUpdate.room.number &&
                                        scheduledAppointment._id !== appointmentToUpdate._id;   
                                        // Ignore the appointment to be updated
                                        if (scheduledAppointment._id == appointmentToUpdateId || noRoomConflict) {
                                            continue;
                                        }
                                    }
                                    //Check if patient already has annual check up appointment
                                    if(newType == 1){
                                        for(let ptAppointment of patient.appointments){
                                            if(ptAppointment.type == newType && ptAppointment.start.getYear() == newStart.getYear() && ptAppointment._id != appointmentToUpdateId){
                                                res.status(400).json({
                                                    success: false,
                                                    message: "You already have an annual check-up appointment for the year"
                                                })
                                                return;
                                            }
                                        }
                                    }
                                    //Check if patient already have an appointment with the newStart 
                                    //if so make sure that it's not the same appointment that you want to update
                                    for(let ptAppointment of patient.appointments){
                                        if(HelperController.overlaps(newStart, newEnd, ptAppointment.start, ptAppointment.end)
                                        && (ptAppointment._id != appointmentToUpdateId)){
                                            return res.status(400).json({
                                                success: false,
                                                message: 'You have an appointment that conflicts with this change',
                                            });
                                        }
                                    }
                                    //Checking for available rooms ate the selected time
                                    while(j<rooms.length){
                                        roomOverlap = HelperController.check_room_overlap(rooms[j], newStart, newEnd)
                                        if (roomOverlap == false){
                                            //Checking for available doctor at the selected time
                                            while(x<doctors.length){
                                    
                                                doctorAvailable = HelperController.check_doctor_available(doctors[x], newStart, newEnd);
                                                if(doctorAvailable.answer&& doctorAvailable.roomFound.equals(rooms[j]._id)){
                                                    break;
                                                }
                                            x++;   
                                            }
                                            if(doctorAvailable.answer == true && doctorAvailable.roomFound.equals(rooms[j]._id)){
                                                // if got here, we can do the update
                                                
                                                Appointment.updateOne( { _id: appointmentToUpdateId },
                                                    {"$set": {
                                                        "start": newStart, 
                                                        "end": newEnd, 
                                                        "doctor": doctors[x]._id,
                                                        "room": rooms[j]._id,
                                                        "duration": duration.toString(),
                                                        "price": price,
                                                        "type" : newType
                                                    }})
                                                    .then(() => {
                                                    }) 
                                                    return res.json({
                                                            success: true,
                                                            message: 'The appointment time has been updated succesfully',
                                                        });
                                            }
                                            else{
                                                return res.status(400).json({
                                                    success: false,
                                                    message: 'Sorry, a room is available but no doctors are available at the selected time '
                                                });
                                            }
                                        }
                                        else if (roomOverlap==true && j>rooms.length){
                                            return res.status(400).json({
                                                success: false,
                                                message: 'All rooms are occupied at the selected time'
                                            });
                                        }
                                        j++;
                                    }
                                })
                        })
                })   
        })
}