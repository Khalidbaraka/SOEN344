const Patient = require('./../models/Patient');
const Doctor = require('./../models/Doctor');
const Nurse = require('../models/Nurse');

const userFactory = function(object, type){
    if(type === 'patient'){
        return new Patient(object)
    } else if(type === 'doctor') {
        return new Doctor(object)
    } else if(type === 'nurse'){
        return new Nurse(object)
    }
}

module.exports = userFactory;