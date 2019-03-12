// Nurse Model
const Nurse = require('../models/Nurse');
const Patient = require('./../models/Patient');
const Clinic = require('./../models/Patient');
const Appointment = require('./../models/Appointment');
const Room = require('./../models/Room');
const Doctor = require('./../models/Doctor');
let bcryptjs = require('bcryptjs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../config/keys');
const HelperController = require('./HelperController');
// Display list of all Nurse
exports.nurse_list = (req, res) => {
    Nurse.find()
        .sort({
            accessID: -1
        })
        .then(nurses => res.json(nurses))
};

// Find NurseByAccessID
exports.nurse_by_access_id = (req, res) => {
    Nurse.findOne({
            accessID: req.body.accessID
        })
        .then(nurse => res.json(nurse))
        .catch(err => console.log(err))
};

// Login nurse
exports.nurse_login = (req, res) => {
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
};

// Create/Register nurse
exports.nurse_register = (req, res) => {

    const nurseData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        accessID: req.body.accessID,
        password: req.body.password
    }

    Nurse.findOne({
            accessID: req.body.accessID
        })
        .then(nurse => {
            if (!nurse) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    nurseData.password = hash;
                    Nurse.create(nurseData)
                        .then(nurse => {
                            res.json({
                                success: true,
                                message: 'Signed up!'
                            });
                        })
                        .catch(err => {
                            res.json({
                                success: false,
                                message: 'Error: Server error'
                            });
                        })
                })
            } else {
                res.json({
                    success: false,
                    message: 'Nurse already exists'
                });
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
};

// Edit Password
exports.change_nurse_password = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        Nurse.findOneAndUpdate({
                accessID: req.body.accessID
            }, {
                $set: {
                    password: hash
                }
            })
            .then(updatedNurse => res.json(updatedNurse))
    })
};

// Delete Nurse
exports.nurse_delete = (req, res) => {
    Nurse.findOneAndDelete({
            accessID: req.body.accessID
        })
        .then(nurse => res.json({
            deleted: true
        }))
        .catch(err => res.status(404).json({
            success: false
        }));
};
 

//Nurse Creates Appointment for Patient
exports.nurse_create_appointment  = (req,res)=>{
    Nurse.findOne({accessID: req.params.accessID})
    .then(nurse => {
        Patient.findOne({healthCardNumber: req.params.health_card_number}).populate('appointments')
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
                            //First Check, check if patient already has annual check up appointment
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
                                //Second check, check if patient already has an appointment at the selected startTime
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
                                    //Third check, check for available rooms at the selected time
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
                                            //Fourth check, check for available doctor at the selected time
                                            console.log("doctor length " + doctors.length);
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
                                            var newAppointment = new Appointment({
                                            type: type,
                                            clinic: null,
                                            doctor: doctors[k]._id,
                                            room: rooms[i]._id,
                                            start: startTime,
                                            patient: patient._id,
                                            end: endTime,
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
                                            //res.json({success:true})
                                            res.json(rooms[i])
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
                            //Handling the reponse from the checks
                            if(annualCheckUpFound == true){
                                res.status(400).json({
                                    success: false,
                                    message: 'The patient already has an annual check up for the year. '
                                });
                            }          
                            if(personalAppointmentOverlap == true){
                                res.status(400).json({
                                    success: false,
                                    message: 'Error. The patient already has an appointment for the selected time.'
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
    })
}
