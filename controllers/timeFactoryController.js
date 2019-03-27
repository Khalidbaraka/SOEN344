const Room = require('../models/Room');
const Timeslot = require('../models/Timeslot');
const Appointment = require('../models/Appointment');


const timeFactory = function(object, type){
    if(type === 'timeslot'){
        return new Timeslot(object)
    } else if(type === 'appointment') {
        return new Appointment(object)
    } else if(type === 'room'){
        return new Room(object)
    }
}

module.exports = timeFactory;
