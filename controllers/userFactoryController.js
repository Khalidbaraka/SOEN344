const Patient = require('./../models/Patient');
const Doctor = require('./../models/Doctor');
const Nurse = require('../models/Nurse');

let doctor_flyweight_default_object = {
    permitNumber: 6379350,
    password: "default_password",
    firstName: "default_firstName",
    lastName: "default_lastName",
    speciality: "default_specialty",
    city: "default_city",
    clinic: "5ca56fb48332364762c446ec",
    appointments: [],
    schedules: []
};

let patient_flyweight_default_object = {
    healthCardNumber: "PEKE 0000 0001",
    birthday: 22011995,
    gender: "default_gender",
    phoneNumber: 5148973564,
    physicalAddress: "default_address",
    emailAddress: "default_emailAddress",
    firstName: "default_firstName",
    lastName: "default_lastName",
    password: "default_password",
    appointments: [],
    cart: []
};

let nurse_flyweight_default_object = {
    firstName: "nurse",
	lastName: "Nurse",
	accessID: "NUR12345",
	password: "password",
	clinic: "5ca56fb48332364762c446ec"
};

doctor_flyweight = new Doctor(doctor_flyweight_default_object);
patient_flyweight = new Patient(patient_flyweight_default_object);
nurse_flyweight = new Nurse(nurse_flyweight_default_object);

const userFactory = function(object, type){
    if(type === 'patient'){

        patient_flyweight.healthCardNumber = object.healthCardNumber;
        patient_flyweight.birthday = object.birthday;
        patient_flyweight.gender = object.gender;
        patient_flyweight.phoneNumber = object.phoneNumber;
        patient_flyweight.physicalAddress = object.physicalAddress;
        patient_flyweight.emailAddress = object.emailAddress;
        patient_flyweight.firstName = object.firstName;
        patient_flyweight.lastName = object.lastName;
        patient_flyweight.password = object.password;
        patient_flyweight.appointments = object.appointments;
        patient_flyweight.cart = object.cart;

        return patient_flyweight;

    } else if(type === 'doctor') {

        doctor_flyweight.permitNumber = object.permitNumber;
        doctor_flyweight.password = object.password;
        doctor_flyweight.firstName = object.firstName;
        doctor_flyweight.lastName = object.lastName;
        doctor_flyweight.speciality = object.speciality;
        doctor_flyweight.city = object.city;
        doctor_flyweight.clinic = object.clinic;
        doctor_flyweight.appointments = object.appointments;
        doctor_flyweight.schedules = object.schedules;

        return doctor_flyweight;

    } else if(type === 'nurse'){
        
        nurse_flyweight.firstName = object.firstName;
        nurse_flyweight.lastName = object.lastName;
        nurse_flyweight.accessID = object.accessID;
        nurse_flyweight.password = object.password;
        nurse_flyweight.clinic = object.clinic;

        return nurse_flyweight;

    }
}

module.exports = userFactory;