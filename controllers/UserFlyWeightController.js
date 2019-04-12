var HashMap = require('hashmap');
const userFactory = require('./userFactoryController');

var userMap = new HashMap();
var newPatient;
var newDoctor;
var newNurse;

const userFlyWeight = function(object, type){

    if(type === "patient") {
        
        if(!userMap.has("patient")){
            newPatient = userFactory(object, type);
            userMap.set("patient", newPatient);
        }
        else {
            newPatient = userMap.get("patient");
        }
 
        newPatient.healthCardNumber = object.healthCardNumber;
        newPatient.birthday = object.birthday;
        newPatient.gender = object.gender;
        newPatient.phoneNumber = object.phoneNumber;
        newPatient.physicalAddress = object.physicalAddress;
        newPatient.emailAddress = object.emailAddress;
        newPatient.firstName = object.firstName;
        newPatient.lastName = object.lastName;
        newPatient.password = object.password;
        newPatient.appointments = object.appointments;
        newPatient.cart = object.cart;

        return newPatient;
    }
        
    else if(type === "doctor") {

        if(!userMap.has("doctor")){
            newDoctor = userFactory(object, type);
            userMap.set("doctor", newDoctor);
        }

        else {
            newDoctor = userMap.get("doctor");
        }

        newDoctor.permitNumber = object.permitNumber;
        newDoctor.password = object.password;
        newDoctor.firstName = object.firstName;
        newDoctor.lastName = object.lastName;
        newDoctor.speciality = object.speciality;
        newDoctor.city = object.city;
        newDoctor.clinic = object.clinic;
        newDoctor.appointments = object.appointments;
        newDoctor.schedules = object.schedules;

        return newDoctor;
    }

    else if(type === "nurse") {

        if(!userMap.has("nurse")){
            newNurse = userFactory(object, type);
            userMap.set("nurse", newNurse);
        }

        else {
            newNurse = userMap.get("nurse");
        }

        newNurse.firstName = object.firstName;
        newNurse.lastName = object.lastName;
        newNurse.accessID = object.accessID;
        newNurse.password = object.password;
        newNurse.clinic = object.clinic;

        return newNurse;
    }
}

module.exports = userFlyWeight;