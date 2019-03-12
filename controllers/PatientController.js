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

//Checkout appointments from the cart.
exports.patient_checkout_appointment = (req, res) =>{
    Patient.findOne({healthCardNumber: req.params.health_card_number}).populate('cart')
        .then(patient => {
            var timeslot = req.body.timeslot;
            var appStart = timeslot.start;
            var appEnd = timeslot.end;
            //Use these for local tests.
            //appStart = new Date(req.body.start);
            //appEnd = new Date(req.body.end);
            let foundRoomNoDoctor = false;
            let roomOverlap = false; 
            let doctorAvailable = false;
            var duration = ((appEnd.getHours() - appStart.getHours()) * 60 )+ (appEnd.getMinutes() - appStart.getMinutes())
            var type =0;
            var price =0; //price for Walk-in is 20 dollars, and anual checkup is 60 dollars
            //from https://stackoverflow.com/questions/21069813/mongoose-multiple-query-populate-in-a-single-call
            //var populateQuery = [{path:'room', select:''}]
            Room.find().sort({'_id': 1}).populate('appointments')
                .then(rooms =>{
                    Doctor.find().populate('schedules')
                        .then(doctors =>{
                            let doctorRoom ="0";
                            let i = 0; //room index
                            let j=0; // appointments index
                            let k=0; //doctor index
                            let l=0; // schedules index
                           while(i<rooms.length){
                            if(rooms[i].appointments.length == 0){
                                console.log("Im here")
                                roomOverlap = false;
                            }
                            else{
                                for (j=0;j<rooms[i].appointments.length; j++) {
                                let start = rooms[i].appointments[j].start;
                                let end = rooms[i].appointments[j].end;
                                roomOverlap = HelperController.overlaps(appStart, appEnd, start, end);
                                if (roomOverlap == true){
                                    break;
                                }
                                }
                            }
                            if (roomOverlap == false){
                                while(k<doctors.length){
                                    if(doctors[k].schedules.length == 0){
                                        doctorAvailable = true;
                                    }
                                    else{
                                        for (l=0;l<doctors[k].schedules.length; l++) {
                                        let doctorStart = doctors[k].schedules[l].start;
                                        let doctorEnd = doctors[k].schedules[l].end;
                                        doctorRoom = doctors[k].schedules[l].room;
                                        doctorAvailable = HelperController.overlaps(appStart, appEnd, doctorStart, doctorEnd);
                                            if (doctorAvailable == true && doctorRoom.equals(rooms[i]._id)){
                                                break;
                                            }
                                        }
                                        if(doctorAvailable == true && doctorRoom.equals(rooms[i]._id)){
                                            break;
                                        }
                                    }
                                  k++;   
                                }
                                if(doctorAvailable ==true && doctorRoom.equals(rooms[i]._id)){
                                    if(duration == 20){
                                        type = 0;
                                        price = 20;
                                    }
                                    else if(duration == 60){
                                        type = 1;
                                        price = 60;
                                    }
                                    else{
                                        res.json({
                                            message: 'duration of appointment not 20 nor 60 minutes'
                                        })
                                    }
                                    var newAppointment = new Appointment({
                                        type: type,
                                        clinic: null,
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
                                    patient.save();
                                    res.json(rooms[i]) 
                                }
                                else{
                                    foundRoomNoDoctor =true;
                                }                                
                                break;
                            }
                           i++;
                           }
                           if(foundRoomNoDoctor == true){
                                res.status(400).json({
                                    success: false,
                                    message: 'Sorry, a room is available but no doctors are available at the selected time '
                                });
                           }
                            if(roomOverlap == true){
                                res.status(400).json({
                                    success: false,
                                    message: 'All rooms are occupied at the selected time'
                                });
                            }
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
            let annualCheckUpFound = false;
            let isInCart = false;
            let personalAppointmentOverlap = false;
            let foundRoomNoDoctor = false;
            let roomOverlap = false; 
            let doctorAvailable = false;
            Room.find().sort({'_id': 1}).populate('appointments')
                .then(rooms =>{
                    Doctor.find().populate('schedules')
                        .then(doctors =>{
                            let doctorRoom ="0";
                            let i = 0; //room index
                            let j=0; // appointments index
                            let k=0; //doctor index
                            let l=0; // schedules index
                            let h = 0;
                            //Check if patient already has annual check up appointment
                            if(type == 1){
                                 while(h<patient.appointments.length){
                                        let ptAppointmentType = patient.appointments[h].type;
                                        let ptAppointmentStart = patient.appointments[h].start;
                                    if(ptAppointmentType == type && ptAppointmentStart.getYear() == startTime.getYear()){
                                        annualCheckUpFound = true;
                                        break;
                                    }
                                h++;
                                }
                            }
                            if(annualCheckUpFound == false){
                                //second check, check if a timeslot with same startTime is in the cart
                                if(patient.cart.length == 0){
                                    isInCart = false;
                                }
                                else{
                                    for(let n = 0; n<patient.cart.length; n++){
                                        let cartStart = patient.cart[n].start;
                                        let cartEnd = patient.cart[n].end;

                                        isInCart = HelperController.overlaps(startTime, endTime, cartStart, cartEnd);

                                        if (isInCart == true){
                                            break;
                                        }
                                    }
                                }
                                    if(isInCart == false){
                                        //Third check, check if patient already has an appointment at the selected startTime
                                        if(patient.appointments.length == 0){
                                            personalAppointmentOverlap = false;
                                        }
                                        else{
                                            for(let m=0; m<patient.appointments.length; m++){
                                                let patientAppointmentStart = patient.appointments[m].start;
                                                let patientAppointmentEnd = patient.appointments[m].end;
                                                personalAppointmentOverlap = HelperController.overlaps(startTime, endTime, patientAppointmentStart, patientAppointmentEnd);

                                                if (personalAppointmentOverlap == true){
                                                    break;
                                                }
                                            }
                                        }
                                        
                                        if (personalAppointmentOverlap == false){
                                            //Fourth check, checking for available rooms at the selected time
                                            while(i<rooms.length){
                                                if(rooms[i].appointments.length == 0){
                                                    roomOverlap = false;
                                                }
                                                else{
                                                    for (j=0;j<rooms[i].appointments.length; j++) {
                                                    let start = rooms[i].appointments[j].start;
                                                    let end = rooms[i].appointments[j].end;
                                                    roomOverlap = HelperController.overlaps(startTime, endTime, start, end);
                                                        if (roomOverlap == true){
                                                            break;
                                                        }
                                                    }
                                                }
                                                if (roomOverlap == false){
                                                    //Fifth check, checking for available doctor at the selected time
                                                    while(k<doctors.length){
                                                        if(doctors[k].schedules.length == 0){
                                                            doctorAvailable = false;
                                                        }
                                                        else{
                                                            for (l=0;l<doctors[k].schedules.length; l++) {
                                                            let doctorStart = doctors[k].schedules[l].start;
                                                            let doctorEnd = doctors[k].schedules[l].end;
                                                            doctorRoom = doctors[k].schedules[l].room;
                                                            doctorAvailable = HelperController.overlaps(startTime, endTime, doctorStart, doctorEnd);
                                                                if (doctorAvailable == true && doctorRoom.equals(rooms[i]._id)){
                                                                    break;
                                                                }
                                                            }
                                                            if(doctorAvailable == true && doctorRoom.equals(rooms[i]._id)){
                                                                break;
                                                            }
                                                        }
                                                    k++;   
                                                    }
                                                if(doctorAvailable == true && doctorRoom.equals(rooms[i]._id)){
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
                                                    res.json(patient.cart) 
                                                }
                                                else{
                                                    foundRoomNoDoctor =true;
                                                }                                
                                                    break;
                                                }
                                             i++;
                                            }
                                        }
                                    }
                                 
                            }

                            //Handling the reponse from the checks
                            if(annualCheckUpFound == true){
                                res.status(400).json({
                                    success: false,
                                    message: 'You already have an annual check up for the year. '
                                });
                            }          
                            if(isInCart == true){
                                res.status(400).json({
                                    success: false,
                                    message: 'An appointment with the same time is already in the cart '
                                });
                            }
                            if(personalAppointmentOverlap == true){
                                res.status(400).json({
                                    success: false,
                                    message: 'Error. You already have an appointment for the selected time.'
                                });
                            }
                            if(foundRoomNoDoctor == true){
                                res.status(400).json({
                                    success: false,
                                    message: 'Sorry, a room is available but no doctors are available at the selected time '
                                });
                            }
                            if(roomOverlap == true){
                                res.status(400).json({
                                    success: false,
                                    message: 'All rooms are occupied at the selected time'
                                });
                            }
                        })
                    
                })
        })
}