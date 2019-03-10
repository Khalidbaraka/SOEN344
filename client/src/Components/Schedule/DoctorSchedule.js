import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import ReactTimeslotCalendar from 'react-timeslot-calendar';
import DoctorHomepage from '../Homepage/DoctorHomepage';

class DoctorSchedule extends Component {

    constructor(props){
        super(props);

        this.state={
            permitNumber: '',
            appointments: '',
            schedules: '',
            isAuthenticated: true
        }
        this._updateTimeslotProps(this.props.timeslotProps);
    }

    //todo
    componentDidMount() {
        var string=  localStorage.getItem('userToken');
        let jsonToken = JSON.parse(string);
        const doctor = {
            schedules: this.state.schedules,
            appointments: this.state.appointments
        };
        const AuthStr = localStorage.getItem("userToken");
        //console.log(doctor.permitNumber);
        axios.get(`/api/doctors/${jsonToken['permitNumber']}/schedule/get`, {
                headers: {Authorization: AuthStr},
                schedules: doctor.schedules,
                appointments: this.appointments
            }
        ).then(res =>
            console.log(t['permitNumber'])
        ).catch(err =>
            console.log(AuthStr)
        )
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
            format: 'h:mm A',
            showFormat: 'h:mm A'
        };

        this.timeslotProps = Object.assign({}, defaultProps, timeslotProps);
    }

    _customTimeslotForDoctor(){
        return(
          <div>

              <ReactTimeslotCalendar

                  timeslotProps = {this.timeslotProps}
                  initialDate={moment().format()}

                  timeslots = { [
                      ['9:00 AM', '9:20 AM'],
                      ['10:00 AM', '12:20 AM'],
                  ] }
                  maxTimeslots = { 0 }
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
}

export default DoctorSchedule;