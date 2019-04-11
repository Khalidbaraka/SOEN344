// Nurse Model
const Nurse = require('../models/Nurse');
const Patient = require('./../models/Patient');
const Clinic = require('./../models/Clinic');
const Appointment = require('./../models/Appointment');
const Room = require('./../models/Room');
const Doctor = require('./../models/Doctor');
let bcryptjs = require('bcryptjs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../config/keys');
const HelperController = require('./HelperController');
const userFlyWeight = require('./UserFlyWeightController');

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
};

// Create/Register nurse
exports.nurse_register = (req, res) => {
    Clinic.findById(req.params.clinic_id)
        .then(clinic =>{
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

                    const newNurse = userFlyWeight(object, "nurse");

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
            let annualCheckUpFound = false; let personalAppointmentOverlap = false;
            let roomOverlap = false; let doctorAvailable = false; 
            Room.find({ clinic: req.params.clinic_id }).sort({ number: 1 }).collation({ locale: "en_US", numericOrdering: true }).populate('appointments')
                .then(rooms =>{
                    Doctor.find({ clinic: req.params.clinic_id }).populate('schedules')
                        .then(doctors =>{
                            Appointment.find({ patient: patient._id, clinic: req.params.clinic_id })
                                .then(appointments => {
                                    let i = 0; //room index
                                    let k=0; //doctor index
                                    //First Check, check if patient already has annual check up appointment
                                    if(type == 1){
                                        annualCheckUpFound = HelperController.check_annual_checkup(appointments,type,startTime,endTime);
                                    }
                                    if(annualCheckUpFound == false){
                                        //Second check, check if patient already has an appointment at the selected startTime
                                        
                                        personalAppointmentOverlap = HelperController.check_personal_overlap(patient,startTime,endTime);
                                        
                                        if (personalAppointmentOverlap == false){
                                            //Third check, check for available rooms at the selected time
                                            while(i<rooms.length){
                                                roomOverlap = HelperController.check_room_overlap(rooms[i], startTime, endTime);
                                                if (roomOverlap == false){
                                                    //Fourth check, check for available doctor at the selected time
                                                    while(k<doctors.length){
                                                        doctorAvailable = HelperController.check_doctor_available(doctors[k],startTime,endTime)
                                                        if(doctorAvailable.answer&& doctorAvailable.roomFound.equals(rooms[i]._id)){
                                                            break;
                                                        }
                                                    k++;   
                                                    }
                                                    if(doctorAvailable.answer == true && doctorAvailable.roomFound.equals(rooms[i]._id)){                                    
                                                        var newAppointment = new Appointment({
                                                        type: type,
                                                        clinic: req.params.clinic_id,
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
                                                        return res.json(rooms[i])
                                                    }
                                                    else{
                                                        return res.status(400).json({
                                                            success: false,
                                                            message: 'Sorry, a room is available but no doctors are available at the selected time '
                                                        });
                                                    } 
                                                }
                                                else if (roomOverlap==true && i>rooms.length){
                                                    return res.status(400).json({
                                                        success: false,
                                                        message: 'All rooms are occupied at the selected time'
                                                    });
                                                }
                                                i++;
                                            }
                                        }
                                        else{
                                            return res.status(400).json({
                                                success: false,
                                                message: 'Error. The patient already has an appointment for the selected time.'
                                            });
                                        }                                      
                                    }
                                    else{
                                        return res.status(400).json({
                                            success: false,
                                            message: 'The patient already has an annual check up for the year. '
                                        });
                                    }
                                })
                        })
                })
        })

}
