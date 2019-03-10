import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import ReactTimeslotCalendar from 'react-timeslot-calendar';

class DoctorSchedule extends Component {

    constructor(){
        super();

        this.state={
            permitNumber: '',
            appointments: '',
            schedules: '',
            isAuthenticated: true
        }
    }

    render() {
        return (
            <div>
                    {this._customTimeslotForDoctor()}
            </div>

        );
    }


    _updateTimeslotProps(timeslotProps) {
        const defaultProps = {
            format: 'h',
            showFormat: 'h:mm A',
        };

        this.timeslotProps = Object.assign({}, defaultProps, timeslotProps);
    }

    _customTimeslotForDoctor(){
        return(

          <div>
              <ReactTimeslotCalendar

                  initialDate={moment().format()}

                  timeslots = { [
                      ['9:00 A', '9:20 A'],
                      ['10', '11'],
                      ['18'],
                  ] }
                  maxTimeslots = { 3 }
                  onSelectTimeslot = { (timeslots, lastSelected) => {
                      console.log('All Timeslots:');
                      console.log(timeslots);

                      console.log('Last selected timeslot:');
                      console.log(lastSelected);
                  } }
              />
          </div>
        );
    }


    componentDidMount() {
        const doctor = {
            permitNumber: this.state.permitNumber,
            schedules: this.state.schedules,
            appointments: this.state.appointments
        };
        const AuthStr = localStorage.getItem("userToken");
        axios.get(`/api/doctors/${doctor.permitNumber}/schedule/get`, {
                headers: {Authorization: `Bearer ${AuthStr}`},
            }
        ).then(res =>
            console.log(AuthStr)
        ).catch(err =>
            console.log(AuthStr)
        )
    }
}

export default DoctorSchedule;