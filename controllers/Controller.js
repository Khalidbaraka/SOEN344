const PatientController = require('./PatientController');

module.exports = {
    // Patient
    patientRegister: PatientController.patient_register,
    patientLogin: PatientController.patient_login,
    patientList: PatientController.patient_list,

    // Cart
    returnCart: PatientController.return_patient_cart,
    saveToCart: PatientController.patient_cart_save,
    deleteCartEntry: PatientController.patient_delete_cart_entry,

    // Appointments
    getAllAppointments: PatientController.patient_get_appointments,
    deleteAppointment: PatientController.patient_delete_appointment,
    checkoutAppointment: PatientController.patient_checkout_appointment,
    updateAppointment: PatientController.patient_update_appointment

}