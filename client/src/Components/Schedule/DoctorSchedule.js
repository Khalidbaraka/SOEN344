import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import ReactTimeslotCalendar from 'react-timeslot-calendar';
import DoctorHomepage from '../Homepage/DoctorHomepage';
import Button from 'react-bootstrap/Button';

class DoctorSchedule extends Component {

    constructor(props){
        super(props);

        this.state={
            permitNumber: '',
            appointments: '',
            schedules: [],
            timeslot: '',
            isAuthenticated: true
        }
        this._updateTimeslotProps(this.props.timeslotProps);
    }
    
    componentDidMount() {
        let string=  localStorage.getItem('userToken');
        let jsonToken = JSON.parse(string);

        //store schedules in an array of timeslots that is compatible with timeslots below
        axios.get(`/api/doctors/${jsonToken['permitNumber']}/schedule/get`)
            .then((res) =>{
            this.setState({
                schedules: res.data
            })
        }).catch(err =>
            console.log(err)
        );

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
            format: 'D/MM/YY h:mm A',
            showFormat: 'D/MM/YY h:mm A'
        };

        this.timeslotProps = Object.assign({}, defaultProps, timeslotProps);
    }

    _customTimeslotForDoctor(){
        const {
            schedules
        } = this.state;
            for (let i = 0; i< schedules.length; i++) {
                  //store these items in timeslot (Mongoose Date to moment format)
                  console.log("mongoose date is " + schedules[i]['start']);
                schedules[i]['start'] =  moment(schedules[i]['start']).format("D/MM/YY h:mm A");
                schedules[i]['end'] = moment(schedules[i]['end']).format("D/MM/YY h:mm A");
                console.log("1st timeslot moment is "+ this.state.schedules[i]['start']);

               
            }        
        return(
            
                
          <div>
              <Button type="submit">BUTTON</Button>
              <ReactTimeslotCalendar


                  timeslotProps = {this.timeslotProps}
                  initialDate={moment().format()}
            
                      
                  timeslots = { [
                       ['12/03/18 9:00 AM']
                  ] }
                  

                  maxTimeslots = { 0 }
                  />
          </div>
        );
    }
}

export default DoctorSchedule;