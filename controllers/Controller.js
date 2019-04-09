const PatientController = require('./PatientController');
const DoctorController = require('./DoctorController');
const NurseController = require('./NurseController');
const ClinicController = require('./ClinicController');
const Login = require('./Login');

module.exports = {

    // Login

    // Patient
    patientRegister: PatientController.patient_register,
    patientLogin: function(req, res){ return Login.changeStrategy('patient',req,res) },
    patientList: PatientController.patient_list,

    // Cart
    returnCart: PatientController.return_patient_cart,
    saveToCart: PatientController.patient_cart_save,
    deleteCartEntry: PatientController.patient_delete_cart_entry,

    // Appointments
    getAllAppointments: PatientController.patient_get_appointments,
    deleteAppointment: PatientController.patient_delete_appointment,
    checkoutAppointment: PatientController.patient_checkout_appointment,
    updateAppointment: PatientController.patient_update_appointment,

    // Doctor
    doctorRegister: DoctorController.doctor_register,
    doctorLogin: function(req, res){ return Login.changeStrategy('doctor',req,res)},
    doctorList: DoctorController.doctor_get_list,

    // Schedule
    getSchedule: DoctorController.doctor_get_schedule,
    createTimeslot: DoctorController.doctor_create_timeslot,
    deleteTimeslot: DoctorController.doctor_delete_timeslot,
    updateTimeslot: DoctorController.doctor_update_timeslot,

    // Nurse
    nurseRegister: NurseController.nurse_register,
    nurseLogin: function(req, res){ return Login.changeStrategy('nurse',req,res)},
    nurseList: NurseController.nurse_list,
    createAppointment: NurseController.nurse_create_appointment,

    //Clinic
    getClinics: ClinicController.clinic_get_all

}