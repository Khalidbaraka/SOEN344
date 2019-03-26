module.exports = {
    //Method verifies if parameters (start, end) representing date for possible new timeslot overlaps with existing timeslot
    overlaps: function(appStart, appEnd, start, end) {
        return ((appStart >= start && appStart < end) 
            || (appEnd > start && appEnd <= end) 
            || (start >= appStart && start < appEnd) 
            || (end > appStart && end <= appEnd));        
    },

    //Method verifies if an appintments date lies within a timeslot
    within: function(appStart, appEnd, start, end) {
        return ((appStart >= start) && (appEnd <= end));
    },
    check_annual_checkup: function(patient,type,startTime){
        for(let i=0; i<patient.appointments.length; i++){
            let ptAppointmentType = patient.appointments[i].type;
            let ptAppointmentStart = patient.appointments[i].start;
            return (ptAppointmentType == type && ptAppointmentStart.getYear() == startTime.getYear())
        }
    },
    check_is_in_cart: function(patient,startTime,endTime){
        if(patient.cart.length == 0){
            return false;
        }
        else{
            for(let i = 0; i<patient.cart.length; i++){
                let cartStart = patient.cart[i].start;
                let cartEnd = patient.cart[i].end;

                return (module.exports.overlaps(startTime, endTime, cartStart, cartEnd));
            }
        }
    },
    check_personal_overlap: function(patient,startTime,endTime){
        if(patient.appointments.length == 0){
            return false;
        }
        else{
            for(let m=0; m<patient.appointments.length; m++){
                let patientAppointmentStart = patient.appointments[m].start;
                let patientAppointmentEnd = patient.appointments[m].end;
                return (module.exports.overlaps(startTime, endTime, patientAppointmentStart, patientAppointmentEnd));
            }
        }
    },
    check_room_overlap: function(rooms,appStart, appEnd){
        if(rooms.appointments.length == 0){
            return false;
        }
        else{
            for (let i =0;i <rooms.appointments.length; i++) {
                let start = rooms.appointments[i].start;
                let end = rooms.appointments[i].end;
                return (module.exports.overlaps(appStart, appEnd, start, end));
            }
        } 
    },
    check_doctor_available: function(doctors, startTime, endTime){
        if(doctors.schedules.length == 0){
            return ({answer:false,
                    roomFound: -1
                    });
        }
        else{
            for (let i=0;i<doctors.schedules.length; i++) {
            let doctorStart = doctors.schedules[i].start;
            let doctorEnd = doctors.schedules[i].end;
            let doctorRoom = doctors.schedules[i].room;
            return ({answer: module.exports.overlaps(startTime, endTime, doctorStart, doctorEnd),
                    roomFound: doctorRoom
                    });        
            }
        }
    }
};