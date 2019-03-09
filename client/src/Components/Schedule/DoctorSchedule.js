import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import ReactTimeslotCalendar from 'react-timeslot-calendar';

class DoctorSchedule extends Component {

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
}

export default DoctorSchedule;